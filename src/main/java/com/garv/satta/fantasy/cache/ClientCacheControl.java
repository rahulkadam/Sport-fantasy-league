package com.garv.satta.fantasy.cache;

import org.springframework.http.CacheControl;

import java.util.concurrent.TimeUnit;

public class ClientCacheControl {

    public static CacheControl getCacheControl() {
        CacheControl cacheControl = CacheControl.maxAge(600, TimeUnit.SECONDS)
                .noTransform()
                .mustRevalidate();
        return cacheControl;
    }

    public static CacheControl getCacheControl(long seconds) {
        CacheControl cacheControl = CacheControl.maxAge(seconds, TimeUnit.SECONDS)
                .noTransform()
                .mustRevalidate();
        return cacheControl;
    }
}
