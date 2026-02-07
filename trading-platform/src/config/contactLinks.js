/**
 * Editable contact and community links.
 * Update these values to change links across the homepage without touching components.
 */
export const CONTACT_LINKS = {
    telegramSignalsChannel: 'https://t.me/kmtsignalss',
    telegramCoursesChannel: 'https://t.me/kmtcor',
    telegramSupportUsername: 'M37mod',
};

export const getTelegramSupportUrl = () =>
    `https://t.me/${CONTACT_LINKS.telegramSupportUsername.replace('@', '')}`;
