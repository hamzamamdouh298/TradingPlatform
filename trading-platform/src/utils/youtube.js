/**
 * Extract YouTube video ID from various URL formats.
 * Supports: youtu.be/ID, youtube.com/watch?v=ID, youtube.com/embed/ID
 */
export function getYouTubeVideoId(url) {
    if (!url || typeof url !== 'string') return null;
    const trimmed = url.trim();
    const patterns = [
        /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
        /^([a-zA-Z0-9_-]{11})$/
    ];
    for (const re of patterns) {
        const match = trimmed.match(re);
        if (match) return match[1];
    }
    return null;
}

/**
 * Build YouTube embed URL with autoplay, loop, and sound (mute=0).
 * Loop requires playlist=videoId.
 */
export function getYouTubeEmbedUrl(videoId, options = {}) {
    if (!videoId) return null;
    const params = new URLSearchParams({
        autoplay: options.autoplay !== false ? '1' : '0',
        mute: options.mute ? '1' : '0',
        loop: options.loop !== false ? '1' : '0',
        playlist: videoId, // required for loop
        rel: '0',
        modestbranding: '1',
        playsinline: '1'
    });
    return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
}
