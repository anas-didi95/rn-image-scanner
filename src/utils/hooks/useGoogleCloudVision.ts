import {GOOGLE_CLOUD_VISION_API_KEY} from '@env';

type TResponse = {
  fullTextAnnotation: {
    text: string;
  };
  textAnnotations: {
    locale?: string;
    description: string;
  }[];
};
const useGoogleCloudVision = () => {
  const getTextDetectionBase64 = async (
    base64: string,
  ): Promise<{responses: TResponse[]}> => {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  content: base64,
                },
                features: [
                  {
                    type: 'TEXT_DETECTION',
                  },
                ],
              },
            ],
          }),
        },
      );
      const responseBody = await response.json();

      return responseBody;
    } catch (e) {
      console.error('[useGoogleCloudVision] getTextDetectionBase64 failed!', e);
      return {responses: []};
    }
  };

  const getTextDetection = async (
    imageUri: string,
  ): Promise<{responses: TResponse[]}> => {
    try {
      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_CLOUD_VISION_API_KEY}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            requests: [
              {
                image: {
                  source: {
                    imageUri: imageUri,
                  },
                },
                features: [
                  {
                    type: 'TEXT_DETECTION',
                  },
                ],
              },
            ],
          }),
        },
      );
      const responseBody = await response.json();

      return responseBody;
    } catch (e) {
      console.error('[useGoogleCloudVision] getTextDetection failed!', e);
      return {responses: []};
    }
  };

  return {getTextDetectionBase64, getTextDetection};
};

export default useGoogleCloudVision;
