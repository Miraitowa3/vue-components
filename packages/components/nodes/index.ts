import Button from './src/index.vue';

Button.install = (app: any) => {
    app.component(Button.name, Button);
};
export default Button;
