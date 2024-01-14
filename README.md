# <ai-term> VanillaJS Web Components

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

<ai-term> is a lightweight, easy-to-use library for integrating AI-powered terms and chat components into your web projects. Using standard HTML5 web components, it allows for seamless addition of AI-driven elements to enhance user interaction.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [<ai-term> Element](#ai-term-element)
  - [<ai-term> Chat Box](#ai-term-chat-box)
- [Configuration](#configuration)
- [Examples](#examples)
- [Support](#support)

## Installation

Simply include the <ai-term> library in your HTML file. Add the following script tag as the first element inside the `<body>` tag:

```html
<body>
    <script src="https://github.com/cryptNG/ai-term-vanillajs/ai-term.js" crossorigin="anonymous"></script>
    <!-- Your content goes here -->
</body>
```

## Usage

### <ai-term> Element

To use the `<ai-term>` component, wrap the term you want to enhance within the `<ai-term>` element. For example:

```html
<h1 class="page-title">
    The <ai-term>Privacy-Friendly</ai-term> Alternative for Secure, User-Respecting Web Human Verification
</h1>
```

### <ai-term> Chat Box

To add an AI-powered chat interface, include the `<ai-term-chat>` element towards the end of your body content. Provide your API key and optional configuration options as attributes:

```html
<ai-term-chat api-key="your_api_key" options="{context:'page'}"></ai-term-chat>
```

## Configuration

- `api-key`: Your unique API key for accessing AI services.
- `options`: A JSON object with configuration settings. For example, `{context:'page'}` sets the context to the current page content.

## Examples

Here are some examples of how to use <ai-term> in your project:

- **Basic Term Highlighting**: `<ai-term>Term</ai-term>`
- **Chat Interface**: `<ai-term-chat api-key="your_api_key"></ai-term-chat>`

## Support

For support, issues, or contributions, please visit the [GitHub repository](https://github.com/cryptNG/ai-term-vanillajs).
