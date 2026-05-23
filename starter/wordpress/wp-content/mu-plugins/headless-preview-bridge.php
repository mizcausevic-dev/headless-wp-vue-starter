<?php
/**
 * Plugin Name: Headless Preview Bridge
 * Description: Issues preview-safe frontend URLs for a decoupled WordPress + Vue stack.
 */

add_filter('preview_post_link', function ($preview_link, $post) {
    $frontend_base = getenv('HEADLESS_FRONTEND_URL') ?: 'https://frontend.example.com';
    $token = wp_create_nonce('headless-preview-' . $post->ID);

    return add_query_arg([
        'slug' => '/' . ltrim(parse_url(get_permalink($post), PHP_URL_PATH), '/'),
        'token' => $token,
    ], trailingslashit($frontend_base) . 'api/preview');
}, 10, 2);
