import { ElUpload } from "element-plus";
function UseUploadImage() {
    const uploadImage = (attrs: any, { slots }: any) => {

        return h(
            ElUpload,
            {
                ...attrs,
                headers: {},

                showfileList: false,
            },
            () => slots.default && slots.default(),
        );
    };

    return {
        uploadImage,
    };
}
export default UseUploadImage;
