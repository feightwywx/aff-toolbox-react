# aff-toolbox-react

[AFF工具箱 -observer-](https://aff.arcaea.icu) 的前端仓库，基于 [React](https://reactjs.org/)，[Gatsby](https://www.gatsbyjs.com/) 和 [MUI](https://mui.com/)。

旧版本：[feightwywx/aff.arcaea.icu](https://github.com/feightwywx/aff.arcaea.icu)

## 这是什么？

AFF工具箱是一个用于生成Arcaea谱面段落的工具。 Arcaea是一款由lowiro开发的创新立体节奏游戏。

## 构建

安装依赖：

```commandline
npm i
```

启动开发服务器：

```commandline
npm run develop
```
构建生产版本：

```commandline
npm run build
```

## How to：添加新页面

1. 搭环境
2. 在`/src/modules`下导出一个新模块（需实现`ArcToolModule`接口）
3. 测试，确保表单正确渲染及`action`正确返回一个`ArcToolResult`

## 表单

本项目自定义了一套表单API，以便生成易于维护的大量表单。添加新页面需要在`ArcToolModule.form`中声明工具需要的表单。

`FormData`用于声明一个控件。`ArcToolModule`中的`form`属性实际上存储了一个`FormData`数组，在需要时，渲染引擎会将`FormData`数组渲染为包含输入检查、提交及各种额外功能的表单。

### `FormData`的属性

#### `type`

控件类型。

|ID|类型|
|---|---|
|aff|一个大输入框，可输入谱面片段。|
|arc|单行输入框，用于输入单行Arc语句。|
|number|数字输入框。|
|bezier|贝塞尔曲线输入框，可输入2个控制点的坐标。|
|easing|缓动下拉选择框。|

#### `id`

控件的ID。用于控制数据。

#### `format`

可留空。输入检查配置。接受一个`FormatOption`数组。`FormatOption`字面量的含义如下表。

|字面量|含义|
|---|---|
|withArcTap|对arc类型控件有效。表示Arc允许有ArcTap。|
|positive|对number类型控件有效。表示接受正数。|
|nonNegative|对number类型控件有效。表示接受非负数。|
|int|对number类型控件有效。表示接受整数。|
|float|对number类型控件有效。表示接受小数。|

#### `required`

给定一个布尔值，表示该字段是否必填。非必填字段会被渲染到折叠区域。

## 配置文件

一些杂项配置。位于`/src/config`。

### `category.ts`

配置抽屉中的工具分类。

#### `category`

分类ID。

#### `newModuleList`

被标记为“新增”的模块ID。
