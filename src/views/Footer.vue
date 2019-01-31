<template>
  <footer>
    <div class="container my-4">
      <div class="fa fa-quote-left col-xs-1 text-warning"></div>
      <div class="quote text-left m-3"><h4>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi, in asperiores quos distinctio odio nobis nam commodi. <span>Molestiae magni tempora consectetur, aperiam minima fugit omnis dolore alias laudantium optio architecto.</span></h4>
      </div>
      <div class="fa fa-quote-right col-xs-1 text-warning"></div>
    </div>
    <div class="container">
        <div class="bio">
          <img :src="require('@/assets/elephant.png')" />
          <div class="text-left">
            <h2 class="my-0 text-white">John Doe</h2>
            <h6>Software Engineer</h6>
          </div>
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

    .quote {
      z-index: 1;
    }

    .fa {
      font-size: 2em;
      position: absolute;

      &:last-child {
        vertical-align: bottom;
        bottom: 0;
        right: 15px;
      }
    }
  }

  .bio {
    display: flex;
    margin: 0 0.5em;
    color: #222;

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

@media only screen and (max-width: 768px) {
  .container span {
    display: none;
  }
}

@media only screen and (max-width: 320px) {
  .container {
    padding: 0;
  }
}
</style>
