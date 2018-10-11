<template>
    <div>
        alert,{{name}}
    </div>
</template>


<script>
import { abc } from './util.js'

abc()

export default {
    name: 'alert'  ,
    data(){
        return {
            name: "毛庭峰"
        }
    }
}
</script>
