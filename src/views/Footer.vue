<template>
  <footer class="lead">
    <div class="container text-white my-4 col-md-6">
      <div class="fa fa-quote-left col-xs-1 text-warning"></div>
      <div class="offset-xs-1 col-xs-4 mx-5 text-left">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, in asperiores quos distinctio odio nobis nam commodi. Molestiae magni tempora consectetur, aperiam minima fugit omnis dolore alias laudantium optio architecto.</div>
      <div class="fa fa-quote-right col-xs-1 text-warning"></div>
    </div>
    <div class="bio col-md-5 mt-5">
      <img :src="require('@/assets/elephant.png')" />
      <div class="text-left">
        <h2 class="my-0">John Doe</h2>
        <h5>Software Engineer</h5>
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
  background: linear-gradient(to bottom, #ff7c2f, #ff6126);
  font-family: 'Segoe UI', Verdana, sans-serif;
  font-size: 1.5em;
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
    padding: 0 1.8em;

    img {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      padding: 10px;
      background: #fff;
      margin-right: 1em;
    }
  }
}
</style>
