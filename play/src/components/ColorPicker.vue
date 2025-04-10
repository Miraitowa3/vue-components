<template>
    <div class="d-color flex w-full items-center justify-between">
        <span
            :class="['d-color-item', color === 'transparent' ? 'colorTransparent' : '', color === '#fff' ? 'colorWhite' : '']"
            :style="{ 'background-color': color }"
            v-for="(color, index) in colorList"
            @click.stop="changeColor(index, color)"
        >
            <i :class="['animate__animated', 'animate__bounceIn', 'text-[18px]', color === '#fff' ? 'text-[#0000004d]' : 'text-[#fff]']" v-show="color === curColor">
                <svg-icon name="dui" />
            </i>
        </span>
        <el-color-picker size="small" v-model="curColor" />
    </div>
</template>

<script lang="ts" setup>
interface Props {
    colorList?: string[];
}

const props = withDefaults(defineProps<Props>(), {
    colorList: () => ["#fff", " #2ECC71", "#33C5C5", "#9B59B6", "#f1c40f", "#E67E22", "#E74C3C"],
});

const curColor = defineModel<string>();

function changeColor(index: number, color: string) {
    curColor.value = color;
}
</script>

<style scoped lang="scss">
.d-color-item {
    position: relative;
    width: 18px;
    height: 100%;
    border-radius: 50%;
    border: 1px solid transparent;
    display: flex;
    transition: transform 0.2s;
    justify-content: center;
    align-items: center;
}
.d-color {
    width: 100%;

    height: 18px;
}
.d-color .d-color-item:hover {
    transform: scale(1.1);
}
.colorWhite {
    border: 1px solid #0000004d;
}
:deep(.el-color-picker) {
    .el-color-picker__trigger {
        border: none;
        padding: 3px;
    }

    .el-color-picker__color {
        border: none;
        .el-color-picker__color-inner {
            border-radius: 50%;
            background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAIBAQEBAQIBAQECAgICAgQDAgICAgUEBAMEBgUGBgYFBgYGBwkIBgcJBwYGCAsICQoKCgoKBggLDAsKDAkKCgr/2wBDAQICAgICAgUDAwUKBwYHCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgr/wgARCAAoACgDAREAAhEBAxEB/8QAGwAAAgIDAQAAAAAAAAAAAAAABwgFCQECAwb/xAAbAQEAAgMBAQAAAAAAAAAAAAAHBQgEBgkCA//aAAwDAQACEAMQAAAAtDxz5W1UCFyvPjBIQ3DFlnlQSIjmYjFNq9UXBpsZ4z082a8AvOs5DAi8eCll17Fx33nreeBxljInF9fGdVbdb7EI+oXh8+aZq4cPoRWE8NMu9OXutT//xAAwEAABBAECAwcDAwUAAAAAAAABAgMEBREABgghMQcJEhMUIkFRYXEVUpGBweHx8v/aAAgBAQABPwDi84td0jcs3su7MbdyDGgrLNnZxTh514ZCm0K6oCTyKhhWQeYHXcz1hcFyZZz3n3lc1uyHCtRJ+SVEnW80+QF5T01a7ptdvThYUlrJiSWiFIfivKbWkjoQpJBB/rruzO9I30e0ur4cuIfdD1xXXb6Ye3r+evxSoks8m2HnOrqHFe0KVlYWtIJKelk7ItZ0iwmKK3ZDynHVk5JUo5Jz9zqTEICs9NdrjIq2HHDyH/P51vLc7YecAc6f4+2ou/JtBfRb+rlKalQJbchhxCiClxCgtJB+CCAdekJGPDr9Jcd9qU9dcbZ3PtXbEM0tJ6lEnzPUP+oSnyMKRj2nJVnOOXTVuL6Y+pctzw5+PCP7aVVKJytXPT9S9DluwpDZDjLim3AfhQOCP5GpTkasYL7vXXEbYK3Mw608vI/b/H4+mtx0CGH3EeXg/wCvvqt2jMv7uJQ1jBclTZTceM2gElTi1BKQAOpJI1xJcOF7HvJnaBsGqXLYlrLs2DHGXG3DzUtKRzWFHmQMkE631NnQluRJsV5hYOFIdQUKBGOoIBGu0F31SVk6vNq2txY+hpayRMfWQlLEZhS1qJwAAACSc/TXdi915v17tHq+IniE2u9UVlM+mXQUM5GJEuSnm286jq0hB9wSrCipKSQEjn//xAAlEQABBAEEAgIDAQAAAAAAAAABAAIDBAUGBxESITETIwhBUWH/2gAIAQIBAT8Ar365sDgrB3YpAAFh3d3BVqTLMBa4cgrcbbalWoOymNZ1LfLmj0R/QP0sdqf7eSVpLVcTpACVo2w27wQqzPiYrELbEJZKOQVDmbUb+wKx2tb9KXsF+Ou7ta+ZIckehbx1/wBUOrqU7eY/IQzrHD2pq89eUsKq13Sv44W30AxkgkHsrTeobIiHY+FWzj+PJW4W21uW669jm8tPsfxUMZLV+t7eCtPM+PhYS49o4Cfk52w9fRX/xAAkEQABBAICAgIDAQAAAAAAAAABAAIDBAURBiESMQcTCBRBUf/aAAgBAwEBPwDleVsgGCt6V1skFol6xXnN2sRDJIRpY+rZdB2Fk+OufETpcl4w9kRc0drBNlEv1riHGZrDA/SxXGCYfSODilGiFc4JXug9Li/42NyeVNqOTQHetLEfHEWFg+jw9JuHhg6a1Voopm7Co48OcuIV46ThsK9joJmecY7Ku1YqbC6Q6C4ZyyrHE2ncd469H+LENhmYJGHYKwsbmHtfuVqtIvlOgPZK+YflrFWaEmKxD/NzunPHoD/Af7tf/9k=)
                no-repeat;
            background-size: cover;
            background-color: transparent !important;
        }
    }
}
</style>
