<script lang="ts" setup>
</script>

<template>
  <div class="container">
    <h1 class="title">
      Pixel to Viewport Unit Converter Demo
    </h1>
    <h1 class="subtitle">
      css开头 @design-width 375px; @design-unit vw;
    </h1>
    <div class="grid">
      <div class="item normal">
        <p class="item-title">
          px转vw
        </p>
        <p>width: 300px; font: 16px</p>
      </div>
      <div class="item small-1px">
        <p class="item-title">
          最小单位转换（1px不转换）
        </p>
        <p>border: 1px; shadow: 0 1px 2px</p>
      </div>
      <div class="item transform">
        <p class="item-title">
          Transform语法转换
        </p>
        <div class="transform-box" />
      </div>
      <div class="item animated">
        <p class="item-title">
          Animation @keyframes 语法转换
        </p>
        <div class="animate-box" />
      </div>
      <div class="item responsive">
        <p class="item-title">
          媒体查询参与转换
        </p>
        <p> @media (min-width: 520px) font-size: 18px; padding: 30px;</p>
      </div>
      <div class="item mixed-units">
        <p class="item-title">
          混合不同单位转换，只针对px转换
        </p>
        <p>margin: 10px 5% 20px 2em; padding: 15px 10vw;</p>
      </div>
      <div class="item complex-values">
        <p class="item-title">
          复杂css工具方法单位转换
        </p>
        <div class="complex-box" />
      </div>
      <div class="item custom-property">
        <p class="item-title">
          var变量 - 按照--custom-width定义的规则转换
        </p>
        <p>width: var(--custom-width)</p>
      </div>
      <div class="item ignore-conversion">
        <p class="item-title">
          忽略转换
        </p>
        <p>/* px-to-viewport-ignore-next */ 换行 width: 150px </p>
        <p>height: 200px /* px-to-viewport-ignore */;</p>
      </div>
      <div class="item nest">
        <p class="item-title">
          更改设计稿标准
        </p>
        <p>@design-width 682px; @design-unit vh; width: 341px; </p>
      </div>
      <div class="item deep">
        <p class="item-title">
          嵌套单位转换
        </p>
        <p>@design-width 750px; @design-unit vh; width: 375px; .item-title {height: 30px} </p>
      </div>
      <div class="item deep-nest-custom-design">
        <p class="item-title">
          媒体查询中更改设计稿标准 嵌套单位转换
        </p>
        <p>
          @media (min-width: 520px) {
          @design-width 1500px;
          @design-unit vw;
          .deep-nest-custom-design {
          width: 750px;
          .item-title {
          width: 750px;
          }
          }
          }
        </p>
      </div>
      <div class="item deep-nest-custom-design-landscape">
        <p class="item-title">
          横屏媒体查询中更改设计稿标准 嵌套单位转换
        </p>
        <p class="item-subtitle">
          @media (min-width: 520px) and (orientation: landscape) {
          .deep-nest-custom-design-landscape {
          .item-subtitle {
          width: 300px;
          }
          }
          @design-width 1500px;
          @design-unit vh;
          .deep-nest-custom-design-landscape {
          width: 750px;
          .item-title {
          width: 750px;
          }
          }
          }
        </p>
      </div>
      <div class="item deep-nest-custom-design-landscape-outside">
        <p class="item-title">
          横屏媒体查询外更改设计稿标准 嵌套单位不转换
        </p>
      </div>

      <h1 class="title">
        暂不支持以下场景
      </h1>
      <div class="item deep-nest">
        <p class="item-title">
          嵌套更改设计稿标准 - 不支持
        </p>
        <p>@design-width 1500px; @design-unit vh; width: 1500px; .item-title{ width: 750px;} </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@design-width 375px;
@design-unit vw;

.container {
  font-family: 'Inter', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.title {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
}
.subtitle {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 14px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.item {
  cursor: grab;
  select-none: none;
  overflow: hidden;
  border-radius: 24px;
  background-color: white;
  padding: 20px;
  transition: all 0.3s ease;
  outline: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #666;
}

.item:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.item:active {
  cursor: grabbing;
}

.item-title {
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
  color: #000;
}

.item p {
  margin-bottom: 10px;
}

.normal {
  width: 300px;
  font-size: 16px;
}

.small-1px {
  border: 1px solid black;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.transform .transform-box {
  width: 50px;
  height: 50px;
  background-color: #3498db;
  transform: rotate(45deg);
}

.animated .animate-box {
  width: 50px;
  height: 50px;
  background-color: #e74c3c;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
    width: 50px;
  }

  50% {
    transform: scale(1.1);
    width: 100px;
  }

  100% {
    transform: scale(1);
    width: 50px;
  }
}

.mixed-units {
  margin: 2em 5% 20px 10px;
  padding: 15px 10vw;
}

.complex-values .complex-box {
  width: 150px;
  height: 150px;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.1) 0px, rgba(0, 0, 0, 0) 100px);
  clip-path: polygon(0px 0px, 100px 0px, 50px 100px);
}

.custom-property {
  width: var(--custom-width);
}

.ignore-conversion {
  /* px-to-viewport-ignore-next */
  width: 300px;
  height: 200px; /* px-to-viewport-ignore */
}

@media (min-width: 520px) {
  .responsive {
    font-size: 18px;
    padding: 30px;
  }
}

.nest {
  @design-width 682px;
  @design-unit vh;
  width: 341px;
}

.deep {
  width: 375px;
  .item-title {
    width: 375px;
  }
}

.deep-nest {
  @design-width 1500px;
  @design-unit vw;
  width: 1500px;
  .item-title {
    width: 750px;
  }
}

.deep-nest-custom-design-landscape-outside {
  width: 375px;
}
@media (min-width: 520px) {
  @design-width 1500px;
  @design-unit vw;
  .deep-nest-custom-design {
    width: 750px;
    .item-title {
      width: 750px;
    }
  }
}

@media (min-width: 520px) and (orientation: landscape) {
  .deep-nest-custom-design-landscape {
    .item-subtitle {
      width: 300px;
    }
  }
  @design-width 1500px;
  @design-unit vh;
  .deep-nest-custom-design-landscape {
    width: 750px;
    .item-title {
      width: 750px;
    }
  }
}
@media (prefers-color-scheme: dark) {
  .container {
    background-color: #0d1117;
  }

  .item {
    background-color: #1f2937;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .item:hover {
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.4);
  }

  .item-title {
    color: #e5e7eb;
  }

  .item p {
    color: #9ca3af;
  }

  .title {
    color: #e5e7eb;
  }
}
</style>
