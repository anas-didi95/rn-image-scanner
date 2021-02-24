import {GOOGLE_CLOUD_VISION_API_KEY} from '@env';

type TResponse = {
  fullTextAnnotation: {
    text: string;
  };
  textAnnotations: {
    description: string;
  }[];
};
const useGoogleCloudVision = () => {
  const getTextDetection = async (
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

      console.log('responseBody', responseBody);
      return responseBody;
    } catch (e) {
      console.error('[useGoogleCloudVision] getTextDetection failed!', e);
      return {responses: []};
    }
  };

  return {getTextDetection};
};

export default useGoogleCloudVision;
