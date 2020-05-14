# Options

## Table Of Contents

[[toc]]

## Inherits

*This component inherits the following, and all options from the following are inherited:*

- [MergesClasses](/)
- [Variant](/)


## Dismissible

- Type: `boolean`
- Default: `undefined`

Can the alert be dismissed.

``` html
<alert dismissible>
    <p>Dismiss this alert.</p>
</alert>
```

## Fade

- Type: `boolean`
- Default: `true`

Should the alert fade when dismissed.

``` html
<alert dismissible :fade="false">
    <p>Dismiss this alert.</p>
</alert>
```

## Heading

- Type: `string`
- Default: `undefined`

The alert heading.

``` html
<alert heading="Some heading">
    <p>Some alert content.</p>
</alert>
```

## Show

- Type: `number`, `boolean`
- Default: `true`

Alerts are visible by default. If passed a number, the alert will be shown
for the number of seconds that are passed.

``` html
<alert :show="false">
    <p>This alert is hidden</p>
</alert>
```

## Title

- Type: `string`
- Default: `undefined`

An alias to heading. `title` or `heading` maybe used interchangeably.

``` html
<alert heading="Some heading">
    <p>Some alert content.</p>
</alert>
```