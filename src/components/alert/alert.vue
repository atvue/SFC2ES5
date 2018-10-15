<template>
    <div>
        this is a SFC component , {{name}}
    </div>
</template>


<script>

export default {
    name: 'alert'  ,
    data(){
        return {
            name: "hello,SFC!"
        }
    }
}
</script>
