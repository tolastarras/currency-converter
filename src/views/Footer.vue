<template>
  <footer class="text-white lead">
    <div class="container my-4 col-md-6">
      <div class="fa fa-quote-left col-xs-1"></div>
      <div class="offset-xs-1 col-xs-8 mx-5 text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, in asperiores quos distinctio odio nobis nam commodi. Molestiae magni tempora consectetur, aperiam minima fugit omnis dolore alias laudantium optio architecto.</div>
      <div class="fa fa-quote-right col-xs-1"></div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
footer {
  background: orangered;
  font-size: 1.6em;
  padding: 1em;

  > .container {
    display: flex;
    position: relative;

    .fa {
      font-size: 2em;
      color: #aaa;

      &:last-child {
        vertical-align: bottom;
        position: absolute;
        bottom: 0;
        right: 0;
      }
    }

    span {
      margin: 1em;
    }    
  }
}
</style>
