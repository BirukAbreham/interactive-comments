import amyrobsonImg from "../images/avatars/image-amyrobson.png"
import juliusomoImg from "../images/avatars/image-juliusomo.png"
import maxblagunImg from "../images/avatars/image-maxblagun.png"
import ramsesmironImg from "../images/avatars/image-ramsesmiron.png"

function getImageByValue(src) {
    let imgWithExtension = src.substring("./images/avatars/image-".length)
    let imgName = imgWithExtension.split(".")[0]

    if (imgName === "amyrobson") {
        return amyrobsonImg
    } else if (imgName === "juliusomo") {
        return juliusomoImg
    } else if (imgName === "maxblagun") {
        return maxblagunImg
    } else if (imgName === "ramsesmiron") {
        return ramsesmironImg
    }
}

export default getImageByValue
