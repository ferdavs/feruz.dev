<script>
let files = __CV_FILES__.files;
</script>

<style>
:global(img) {
  height: auto;
  width: 800px;
}

.image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}

@media (min-width: 1600px) {
  .image-container {
    flex-direction: row;
  }
  .image-container img:nth-of-type(2) {
    position: relative;
    top: 110px; /* Offset the second image vertically */
  }
}
</style>

<div class="image-container">
  {#each files as file, i}
    <img src={file} alt="cv" />
  {/each}
</div>
