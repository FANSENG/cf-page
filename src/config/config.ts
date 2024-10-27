type Config = {
    APIKEY: string;
    BaseURI: string;
};

const GLM4FlashConfig: Config = {
    APIKEY: process.env.REACT_APP_API_KEY as string,
    BaseURI: process.env.REACT_APP_BASE_URI as string,
}

console.log(GLM4FlashConfig)

export {GLM4FlashConfig};