<script lang="ts">
export default {
  name: 'Opacity',
}
</script>

<template>
    <div class="full-mask" v-show="props.show" @click.self.stop="changeShow">
        <div class="full-mask-poc" :style="{left: props.location.left+'px', top: props.location.top+'px'}">
            <div class="tool-opacity-child">
                <div class="slider">
                    <label class="slider-label">透明度</label>
                    <div class="slider-area" id="slider-area">
                        <div class="slider-back" :style="`--value: ${props.value}%`"></div>
                        <div class="slider-block" id="slider-block" :style="{left: `calc(${props.value}% - 7.5px)`}"></div>
                    </div>
                    <input class="slider-input" type="text" v-model="inputValue" @blur="inputBlur">
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
    import { onMounted, watch, nextTick, computed } from 'vue';
    interface Location {
        left: number,
        top: number
    }
    const props = withDefaults(defineProps<{
        show: boolean,
        value: number,
        location: Location
    }>(), {
        show: false,
        value: 0,
        location: () => {
            return {
                left: 0,
                top: 0
            }
        }
    })
    const inputValue = computed({
        get:() => props.value,
        set: (value: number) => emit("update:value", value)
    })
    const emit = defineEmits(['update:show', 'update:value'])

    watch([() => props.show], val => {
        if(val[0]) {
            nextTick(() => {
                bindListener()
            })
        } else {
            
        }
        console.log('change show', val);
    })

    let startX = 0; //鼠标按下的位置
    let barWidth = 152; // 滑块的宽度

    function bindListener() {
        const box = document.getElementById('slider-area');
        box?.addEventListener('mousedown', function(event: MouseEvent) {
            event.preventDefault();
            event.stopPropagation();
            startX = event.clientX
            console.log(event);

            console.log(event.offsetX/barWidth);
            inputValue.value = Math.trunc(event.offsetX/barWidth*100)

            box?.addEventListener('mousemove', mMove)
        })

        box?.addEventListener('mouseup', function(event: MouseEvent){
            box?.removeEventListener('mousemove', mMove)
        })
    }

    const changeShow = () => {
        emit('update:show', false)
    }

    let mMove = (event: MouseEvent) => {
        event.stopPropagation()
        event.preventDefault()
        console.log(event);
        let disWidth = event.clientX - startX + 7.5;
        if(disWidth > barWidth) {
            disWidth = barWidth
        } 
        if(disWidth < 0){
            disWidth = 0
        }

        console.log(disWidth, disWidth/barWidth);

        inputValue.value = Math.trunc(disWidth/barWidth*100)
    }

    // 输入框失去焦点，更新透明度
    function inputBlur() {
        
    }

    onMounted(() => {
        // const box = document.getElementById('slider-area');
        // console.log(box);
        // const ele = document.getElementById('slider-block');
        // let startX = 0; //鼠标按下的位置
        // box?.addEventListener('mousedown', function(event: MouseEvent) {
        //     event.preventDefault();
        //     event.stopPropagation();
        //     startX = event.clientX
        //     console.log(event);

        //     let nowX = event.offsetX;
        //     const ele = document.getElementById('slider-block');
        //     if(ele) ele.style.left = nowX + 'px'

        //     ele?.addEventListener('mousemove', mMove)
        // })
        // box?.addEventListener('mouseup', function(event: MouseEvent){
        //     ele?.removeEventListener('mousemove', mMove)
        // })
        // inputValue.value = bar_width*props.value
    })
</script>
<style scoped lang="scss">
    .full-mask{
        background: transparent;
        height: 100%;
        left: 0;
        position: fixed;
        top: 0;
        width: 100%;
        z-index: 99;
        .full-mask-poc{
            height: 0;
            position: absolute;
            width: 0;
            z-index: 2;
        }
        .tool-opacity-child{
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 9px 28px 8px rgb(42 49 67 / 6%), 0 3px 6px -4px rgb(42 49 67 / 11%), 0 6px 16px 0 rgb(42 49 67 / 8%);
            left: 18px;
            position: absolute;
            top: 44px;
            transform: translateX(-50%);
        }
        .slider{
            display: flex;
            align-items: center;
            background: #fff;
            box-sizing: border-box;
            cursor: default;
            height: 40px;
            padding: 0 16px;
            z-index: 1;
            .slider-label{
                color: #1b2337;
                width: 54px;
            }
            .slider-area{
                height: 40px;
                margin: 0 12px 0 0;
                position: relative;
                width: 152px;
                .slider-back{
                    background: #e4e7ed;
                    border-radius: 4px;
                    cursor: pointer;
                    height: 3px;
                    position: absolute;
                    top: 18px;
                    width: 100%;
                    // --value: 44%
                    &::before {
                        background: #0773fc;
                        border-radius: 1.5px;
                        content: "";
                        height: 3px;
                        left: 0;
                        position: absolute;
                        top: 0;
                        width: var(--value);
                    }
                }
                .slider-block{
                    background: #fff;
                    border: 1px solid #0773fc;
                    border-radius: 50%;
                    box-sizing: border-box;
                    cursor: pointer;
                    height: 15px;
                    left: 0;
                    // left: calc(44% - 7.5px);
                    position: absolute;
                    top: 12px;
                    width: 15px;
                }
            }
            .slider-input{
                border: 1px solid rgba(0,0,0,.1);
                border-radius: 3px;
                box-sizing: border-box;
                color: #1b2337;
                height: 30px;
                line-height: 30px;
                text-align: center;
                width: 50px;
            }
        }
    }
</style>    