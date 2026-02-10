import React, { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY_MARKET = 'kmt_market_assets';

const defaultAssets = [
    { id: 'eurusd', name: 'EUR / USD', symbol: 'EURUSD', price: 1.0852, change: 0.32, visible: true },
    { id: 'btcusd', name: 'Bitcoin', symbol: 'BTCUSD', price: 43250.0, change: -1.25, visible: true },
    { id: 'gold', name: 'Gold', symbol: 'XAUUSD', price: 2324.5, change: 0.78, visible: true },
];

const MarketContext = createContext();

export const MarketProvider = ({ children }) => {
    const [assets, setAssets] = useState(defaultAssets);
    const [enabled, setEnabled] = useState(true);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY_MARKET);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed.assets)) {
                    setAssets(parsed.assets);
                }
                if (typeof parsed.enabled === 'boolean') {
                    setEnabled(parsed.enabled);
                }
            }
        } catch (_) {
            // ignore
        }
    }, []);

    const persist = (next) => {
        localStorage.setItem(STORAGE_KEY_MARKET, JSON.stringify(next));
    };

    const updateAsset = (id, updates) => {
        setAssets((prev) => {
            const nextAssets = prev.map((a) => (a.id === id ? { ...a, ...updates } : a));
            persist({ assets: nextAssets, enabled });
            return nextAssets;
        });
    };

    const addAsset = () => {
        const id = `asset_${Date.now()}`;
        setAssets((prev) => {
            const nextAssets = [
                ...prev,
                {
                    id,
                    name: 'New Asset',
                    symbol: 'TICKER',
                    price: 0,
                    change: 0,
                    visible: true,
                },
            ];
            persist({ assets: nextAssets, enabled });
            return nextAssets;
        });
    };

    const removeAsset = (id) => {
        setAssets((prev) => {
            const nextAssets = prev.filter((a) => a.id !== id);
            persist({ assets: nextAssets, enabled });
            return nextAssets;
        });
    };

    const setSectionEnabled = (value) => {
        setEnabled(value);
        persist({ assets, enabled: value });
    };

    const getVisibleAssets = () => assets.filter((a) => a.visible);

    return (
        <MarketContext.Provider
            value={{
                assets,
                enabled,
                setSectionEnabled,
                updateAsset,
                addAsset,
                removeAsset,
                getVisibleAssets,
            }}
        >
            {children}
        </MarketContext.Provider>
    );
};

export const useMarket = () => useContext(MarketContext);

