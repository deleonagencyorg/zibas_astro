import React from 'react';
import {
  FacebookShareButton,
  FacebookIcon,
} from 'react-share';

const InstagramIcon = ({ size = 32, round = true }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    aria-hidden="true"
    style={{ borderRadius: round ? '50%' : '0' }}
  >
    <defs>
      <linearGradient id="instagramGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#feda75" />
        <stop offset="25%" stopColor="#fa7e1e" />
        <stop offset="50%" stopColor="#d62976" />
        <stop offset="75%" stopColor="#962fbf" />
        <stop offset="100%" stopColor="#4f5bd5" />
      </linearGradient>
    </defs>
    <rect width="64" height="64" rx={round ? 32 : 8} fill="url(#instagramGradient)" />
    <circle cx="32" cy="32" r="14" fill="none" stroke="#fff" strokeWidth="4" />
    <circle cx="46" cy="18" r="3.5" fill="#fff" />
  </svg>
);

const SocialShare = ({
  url,
  title,
  description = '',
  hashtags = [],
  iconSize = 32,
  round = true,
  className = '',
  buttonClassName = '',
  platforms = ['facebook', 'instagram'],
  labels = {
    facebook: 'Facebook',
    instagram: 'Instagram',
  },
  showLabels = false
}) => {
  const handleInstagramShare = async () => {
    const shareText = [title, description, url].filter(Boolean).join('\n');

    try {
      if (navigator.share) {
        await navigator.share({ title, text: description, url });
        return;
      }
    } catch {
      // User cancelled or share unavailable
    }

    try {
      await navigator.clipboard.writeText(shareText || url);
    } catch {
      // Clipboard unavailable
    }

    window.open('https://www.instagram.com/', '_blank', 'noopener,noreferrer');
  };

  const renderButtons = () => {
    const buttons = [];

    if (platforms.includes('facebook')) {
      buttons.push(
        <div key="facebook" className={`inline-block ${buttonClassName}`}>
          <FacebookShareButton
            url={url}
            quote={`${title}\n${description}`}
            hashtag={hashtags.length > 0 ? `#${hashtags[0]}` : undefined}
          >
            <FacebookIcon size={iconSize} round={round} />
            {showLabels && <span className="block text-xs mt-1">{labels.facebook}</span>}
          </FacebookShareButton>
        </div>
      );
    }

    if (platforms.includes('instagram')) {
      buttons.push(
        <div key="instagram" className={`inline-block ${buttonClassName}`}>
          <button
            type="button"
            onClick={handleInstagramShare}
            className="inline-flex flex-col items-center bg-transparent border-0 p-0 cursor-pointer"
            aria-label={labels.instagram || 'Instagram'}
          >
            <InstagramIcon size={iconSize} round={round} />
            {showLabels && <span className="block text-xs mt-1">{labels.instagram}</span>}
          </button>
        </div>
      );
    }

    return buttons;
  };

  return (
    <div className={`social-share flex gap-2 items-center ${className}`}>
      {renderButtons()}
    </div>
  );
};

export default SocialShare;
