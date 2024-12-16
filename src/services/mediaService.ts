export interface MediaDimensions {
  width: number;
  height: number;
}

export interface MediaSizes {
  small: MediaDimensions;
  medium: MediaDimensions;
  large: MediaDimensions;
  card: MediaDimensions;
}

export const MEDIA_SIZES: MediaSizes = {
  small: { width: 231, height: 87 },    // Steam capsule size
  medium: { width: 460, height: 215 },  // Steam header size
  large: { width: 650, height: 350 },   // Card size
  card: { width: 650, height: 350 }     // Default card size
};

interface VideoThumbnailOptions {
  quality: 'maxres' | 'sd' | 'hq' | 'mq' | 'default';
}

export class MediaService {
  private static instance: MediaService;

  private constructor() {}

  public static getInstance(): MediaService {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService();
    }
    return MediaService.instance;
  }

  private getPlaceholder(dimensions: MediaDimensions): string {
    return `https://placehold.co/${dimensions.width}x${dimensions.height}/1a1a1a/purple?text=No+Image`;
  }

  public processImageUrl(url: string, dimensions: MediaDimensions = MEDIA_SIZES.card): string {
    if (!url) {
      return this.getPlaceholder(dimensions);
    }

    try {
      // Handle Steam images
      if (url.includes('steamstatic.com')) {
        if (dimensions.width <= MEDIA_SIZES.small.width) {
          return url.replace(/header|capsule_\d+x\d+/, `capsule_${MEDIA_SIZES.small.width}x${MEDIA_SIZES.small.height}`);
        } else if (dimensions.width <= MEDIA_SIZES.medium.width) {
          return url.replace(/capsule_\d+x\d+|header/, 'header');
        } else {
          return url.replace(/capsule_\d+x\d+|header/, `header_${dimensions.width}x${dimensions.height}`);
        }
      }

      // Handle Google Play Store images
      if (url.includes('play-lh.googleusercontent.com')) {
        return url.replace(/=w\d+-h\d+/, `=w${dimensions.width}-h${dimensions.height}`);
      }

      // Handle HLTV images
      if (url.includes('img-cdn.hltv.org')) {
        const urlObj = new URL(url);
        urlObj.searchParams.set('w', dimensions.width.toString());
        if (urlObj.searchParams.has('mark-w')) {
          urlObj.searchParams.set('mark-w', dimensions.width.toString());
        }
        return urlObj.toString();
      }

      // Handle YouTube thumbnails
      if (url.includes('youtube.com/vi/') || url.includes('youtu.be/') || url.includes('i.ytimg.com/vi/')) {
        const videoId = this.extractYouTubeId(url);
        if (videoId) {
          return this.getYouTubeThumbnail(videoId, { quality: this.getYouTubeQualityForDimensions(dimensions) });
        }
      }

      return url;
    } catch (error) {
      console.error('Error processing image URL:', error);
      return this.getPlaceholder(dimensions);
    }
  }

  private extractYouTubeId(url: string): string | null {
    try {
      if (url.includes('youtu.be/')) {
        return url.split('youtu.be/')[1].split(/[?#]/)[0];
      }
      if (url.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(url.split('?')[1]);
        return urlParams.get('v');
      }
      if (url.includes('/vi/') || url.includes('/embed/')) {
        return url.split(/\/vi\/|\/embed\//)[1].split('/')[0];
      }
      // Handle lite-youtube elements
      const videoIdMatch = url.match(/videoid="([^"]+)"/);
      if (videoIdMatch) {
        return videoIdMatch[1];
      }
    } catch (error) {
      console.error('Error extracting YouTube ID:', error);
    }
    return null;
  }

  private getYouTubeQualityForDimensions(dimensions: MediaDimensions): VideoThumbnailOptions['quality'] {
    if (dimensions.width >= 1280) return 'maxres';
    if (dimensions.width >= 640) return 'sd';
    if (dimensions.width >= 480) return 'hq';
    if (dimensions.width >= 320) return 'mq';
    return 'default';
  }

  public getYouTubeThumbnail(videoId: string, options: VideoThumbnailOptions): string {
    return `https://i.ytimg.com/vi/${videoId}/${options.quality}default.jpg`;
  }

  public getVideoEmbedUrl(url: string): string | null {
    const videoId = this.extractYouTubeId(url);
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  }
}

export const mediaService = MediaService.getInstance();

// Example usage:
// import { mediaService, MEDIA_SIZES } from './mediaService';
// const processedUrl = mediaService.processImageUrl(originalUrl, MEDIA_SIZES.card);
