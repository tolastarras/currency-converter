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

<style lang="scss" scoped>
@import '@/styles/components/footer.scss';
</style>
