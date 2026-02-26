"""
import_products.py — AI → WooCommerce product pipeline

Usage:
    python3 -m pip install requests python-dotenv
    cp .env.example .env   # fill in your credentials
    python3 import_products.py

Reads products.json, uploads images from ./assets/, creates or updates
products via the WooCommerce REST API.
"""

import base64
import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

load_dotenv()

WC_API_URL = os.getenv("WC_API_URL")
CK = os.getenv("WC_CONSUMER_KEY")
CS = os.getenv("WC_CONSUMER_SECRET")

WP_MEDIA_URL = os.getenv("WP_MEDIA_URL")
WP_USER = os.getenv("WP_USER")
WP_APP_PASSWORD = os.getenv("WP_APP_PASSWORD")

ASSETS_DIR = Path(os.getenv("ASSETS_DIR", "./assets"))


def wc_auth_params():
    return {"consumer_key": CK, "consumer_secret": CS}


def wp_basic_auth_header():
    token = base64.b64encode(f"{WP_USER}:{WP_APP_PASSWORD}".encode()).decode()
    return {"Authorization": f"Basic {token}"}


def upload_media(filename: str) -> int:
    file_path = ASSETS_DIR / filename
    if not file_path.exists():
        raise FileNotFoundError(f"Missing image: {file_path}")

    headers = wp_basic_auth_header()
    headers["Content-Disposition"] = f'attachment; filename="{file_path.name}"'

    with open(file_path, "rb") as f:
        r = requests.post(WP_MEDIA_URL, headers=headers, data=f)
    r.raise_for_status()
    return r.json()["id"]


def find_product_by_sku(sku: str):
    r = requests.get(
        f"{WC_API_URL}/products",
        params={**wc_auth_params(), "sku": sku},
    )
    r.raise_for_status()
    items = r.json()
    return items[0] if items else None


def ensure_terms(endpoint: str, names: list) -> list:
    """Find or create taxonomy terms (categories or tags). Returns list of IDs."""
    ids = []
    for name in names:
        r = requests.get(
            f"{WC_API_URL}/{endpoint}",
            params={**wc_auth_params(), "search": name},
        )
        r.raise_for_status()
        existing = next(
            (x for x in r.json() if x["name"].lower() == name.lower()), None
        )
        if existing:
            ids.append(existing["id"])
            continue
        r = requests.post(
            f"{WC_API_URL}/{endpoint}",
            params=wc_auth_params(),
            json={"name": name},
        )
        r.raise_for_status()
        ids.append(r.json()["id"])
    return ids


def upsert_product(p: dict):
    sku = p["sku"]
    existing = find_product_by_sku(sku)

    cat_ids = ensure_terms("products/categories", p.get("categories", []))
    tag_ids = ensure_terms("products/tags", p.get("tags", []))

    image_ids = []
    for img in p.get("images", []):
        mid = upload_media(img)
        image_ids.append({"id": mid})

    payload = {
        "name": p["name"],
        "sku": sku,
        "type": "simple",
        "regular_price": str(p["regular_price"]),
        "short_description": p.get("short_description", ""),
        "description": p.get("description", ""),
        "categories": [{"id": cid} for cid in cat_ids],
        "tags": [{"id": tid} for tid in tag_ids],
        "images": image_ids,
    }

    if existing:
        pid = existing["id"]
        r = requests.put(
            f"{WC_API_URL}/products/{pid}",
            params=wc_auth_params(),
            json=payload,
        )
        r.raise_for_status()
        print(f"Updated  {sku} -> product_id={pid}")
    else:
        r = requests.post(
            f"{WC_API_URL}/products",
            params=wc_auth_params(),
            json=payload,
        )
        r.raise_for_status()
        pid = r.json()["id"]
        print(f"Created  {sku} -> product_id={pid}")


def main():
    with open("products.json", "r", encoding="utf-8") as f:
        products = json.load(f)
    print(f"Importing {len(products)} product(s)...")
    for p in products:
        upsert_product(p)
    print("Done.")


if __name__ == "__main__":
    main()
