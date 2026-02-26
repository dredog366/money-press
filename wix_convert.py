"""
wix_convert.py — Convert CSV/Excel product data → Wix Store CSV import format

Usage:
    python3 -m pip install pandas openpyxl
    python3 wix_convert.py your_products.csv
    python3 wix_convert.py your_products.xlsx

Then in Wix dashboard:
    Catalog → Products → Import Products → upload wix_products.csv

Column mapping (edit COLUMN_MAP below to match your spreadsheet headers):
    Your column name → Wix field
"""

import sys
import re
import pandas as pd
from pathlib import Path

# ──────────────────────────────────────────────
# EDIT THIS: map YOUR spreadsheet column headers
# to the internal keys used below.
# Set a key to None to skip / use the default.
# ──────────────────────────────────────────────
COLUMN_MAP = {
    # internal key   →  your column header (case-insensitive)
    "name":            "name",          # required
    "description":     "description",
    "price":           "price",         # required
    "sku":             "sku",
    "cost":            "cost",
    "inventory":       "stock",         # number → InStock / OutOfStock
    "category":        "category",
    "image_url":       "image_url",
    "weight":          "weight",
    "visible":         "active",        # true/false or 1/0
}

# Default values when a column is missing or empty
DEFAULTS = {
    "visible":   "true",
    "inventory": "InStock",
    "ribbon":    "",
    "weight":    "0",
}

OUTPUT_FILE = "wix_products.csv"

# Wix CSV columns (fixed order required)
WIX_COLUMNS = [
    "handleId",
    "fieldType",
    "name",
    "description",
    "productImageUrl",
    "collection",
    "sku",
    "ribbon",
    "price",
    "surcharge",
    "visible",
    "discountMode",
    "discountValue",
    "inventory",
    "weight",
    "cost",
    "productOptionName1",
    "productOptionType1",
    "productOptionDescription1",
    "productOptionName2",
    "productOptionType2",
    "productOptionDescription2",
    "additionalInfoTitle1",
    "additionalInfoDescription1",
    "additionalInfoTitle2",
    "additionalInfoDescription2",
    "customTextField1",
    "customTextCharLimit1",
    "customTextMandatory1",
    "brand",
]


def slugify(text: str) -> str:
    text = str(text).lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_-]+", "-", text)
    return text


def resolve_col(df: pd.DataFrame, key: str) -> pd.Series | None:
    """Find a column in the dataframe using the COLUMN_MAP, case-insensitive."""
    mapped = COLUMN_MAP.get(key)
    if mapped is None:
        return None
    for col in df.columns:
        if col.strip().lower() == mapped.lower():
            return df[col]
    return None


def to_bool(val) -> str:
    if pd.isna(val):
        return DEFAULTS["visible"]
    s = str(val).strip().lower()
    return "true" if s in ("true", "1", "yes", "y", "active") else "false"


def to_inventory(val) -> str:
    if pd.isna(val):
        return DEFAULTS["inventory"]
    try:
        n = float(val)
        return "InStock" if n > 0 else "OutOfStock"
    except (ValueError, TypeError):
        s = str(val).strip().lower()
        return "OutOfStock" if s in ("0", "false", "no", "out") else "InStock"


def load_source(path: Path) -> pd.DataFrame:
    if path.suffix.lower() in (".xlsx", ".xls"):
        return pd.read_excel(path)
    return pd.read_csv(path)


def convert(source_path: Path) -> None:
    print(f"Reading {source_path}...")
    df = load_source(source_path)
    print(f"  {len(df)} rows, columns: {list(df.columns)}")

    rows = []
    for i, row in df.iterrows():
        def get(key, default=""):
            col = resolve_col(df, key)
            if col is None:
                return default
            val = col.iloc[i]
            return "" if pd.isna(val) else str(val).strip()

        name = get("name")
        if not name:
            print(f"  Skipping row {i} — no name")
            continue

        handle = slugify(name)

        # inventory: convert stock number → InStock/OutOfStock
        inv_col = resolve_col(df, "inventory")
        raw_inv = inv_col.iloc[i] if inv_col is not None else None
        inventory = to_inventory(raw_inv)

        # visible
        vis_col = resolve_col(df, "visible")
        raw_vis = vis_col.iloc[i] if vis_col is not None else None
        visible = to_bool(raw_vis)

        wix_row = {col: "" for col in WIX_COLUMNS}
        wix_row.update({
            "handleId":       handle,
            "fieldType":      "Product",
            "name":           name,
            "description":    get("description"),
            "productImageUrl": get("image_url"),
            "collection":     get("category"),
            "sku":            get("sku"),
            "ribbon":         DEFAULTS["ribbon"],
            "price":          get("price"),
            "surcharge":      "",
            "visible":        visible,
            "discountMode":   "",
            "discountValue":  "",
            "inventory":      inventory,
            "weight":         get("weight", DEFAULTS["weight"]),
            "cost":           get("cost"),
        })
        rows.append(wix_row)

    if not rows:
        print("No valid rows found. Check your COLUMN_MAP settings.")
        return

    out = pd.DataFrame(rows, columns=WIX_COLUMNS)
    out.to_csv(OUTPUT_FILE, index=False)
    print(f"\nWrote {len(rows)} products to {OUTPUT_FILE}")
    print(f"\nNext step:")
    print(f"  Wix Dashboard → Catalog → Products → Import Products → upload {OUTPUT_FILE}")


def main():
    if len(sys.argv) < 2:
        print("Usage: python3 wix_convert.py <your_products.csv or .xlsx>")
        sys.exit(1)
    source = Path(sys.argv[1])
    if not source.exists():
        print(f"File not found: {source}")
        sys.exit(1)
    convert(source)


if __name__ == "__main__":
    main()
