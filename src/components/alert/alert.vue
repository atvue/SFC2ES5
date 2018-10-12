<template>
    <div>
        alert,{{name}}
        <test name="maotingfeng">
            哈哈哈哈
        </test>
    </div>
</template>


<script>
import { abc } from './util.js'
import test from './test'
abc()

export default {
    name: 'alert'  ,
    components: {
        test
    } ,
    data(){
        return {
            name: "毛庭峰"
        }
    }
}
</script>
