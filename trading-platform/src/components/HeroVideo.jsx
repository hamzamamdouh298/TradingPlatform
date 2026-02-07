import { useState, useMemo } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { useLanguage } from '../context/LanguageContext';
import { getYouTubeVideoId, getYouTubeEmbedUrl } from '../utils/youtube';
import { PlayCircle } from 'lucide-react';

const DEFAULT_VIDEO_ID = 'YPPMM-i5ebU'; // fallback if URL parsing fails

/**
 * Reusable hero video component. Uses admin-configured YouTube URL from SiteSettings.
 * Autoplay, loop, sound (mute=0). Responsive with gradient overlay for text readability.
 */
export function HeroVideo({ videoUrl: propVideoUrl, overlay = true, className = '' }) {
    const { heroVideoUrl } = useSiteSettings();
    const { t } = useLanguage();
    const [loadError, setLoadError] = useState(false);

    const url = propVideoUrl ?? heroVideoUrl;
    const videoId = useMemo(() => getYouTubeVideoId(url) || DEFAULT_VIDEO_ID, [url]);
    const embedUrl = useMemo(
        () => getYouTubeEmbedUrl(videoId, { autoplay: true, mute: false, loop: true }),
        [videoId]
    );

    if (loadError) {
        return (
            <div
                className={`relative w-full aspect-video flex items-center justify-center rounded-xl overflow-hidden bg-black/40 ${className}`}
                style={{ minHeight: 'min(56.25vw, 70vh)' }}
            >
                <div className="flex flex-col items-center gap-4 text-white/80">
                    <PlayCircle size={64} className="opacity-60" />
                    <p className="text-lg font-medium">{t('videoUnavailable')}</p>
                    <a
                        href={`https://www.youtube.com/watch?v=${videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        {t('watchOnYouTube')}
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative w-full overflow-hidden rounded-xl ${className}`}>
            <div
                className="relative w-full bg-black"
                style={{ aspectRatio: '16/9', minHeight: 'min(56.25vw, 70vh)' }}
            >
                <iframe
                    src={embedUrl}
                    title="Hero video"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    onError={() => setLoadError(true)}
                />
                {overlay && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        aria-hidden
                        style={{
                            background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, transparent 40%, transparent 60%, rgba(0,0,0,0.4) 100%)'
                        }}
                    />
                )}
            </div>
        </div>
    );
}
