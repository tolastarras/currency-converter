<template>
  <footer class="lead">
    <div class="container text-white my-4 col-md-6">
      <div class="fa fa-quote-left col-xs-1"></div>
      <div class="offset-xs-1 col-xs-4 mx-5 text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, in asperiores quos distinctio odio nobis nam commodi. Molestiae magni tempora consectetur, aperiam minima fugit omnis dolore alias laudantium optio architecto.</div>
      <div class="fa fa-quote-right col-xs-1"></div>
    </div>
    <div class="bio col-md-4 mt-4">
      <img :src="require('@/assets/logo.png')" />
      <div class="text-left">
        <h2 class="my-0">tolastarras</h2>
        <h4>Software Engineer</h4>
      </div>
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
  border-top-right-radius: 120px;

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

  .bio {
    display: flex;
    margin: 0 auto;

    img {
      border-radius: 50%;
      width: 2.4em;
      height: 2.4em;
      padding: 10px;
      background: #fff;
      margin-right: 1em;
    }
  }  
}
</style>
