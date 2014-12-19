UX Rocket ShortCode
===============

Simple keyboard command definitions. 
For preventing overwriting default commands, only commands defined with alt least two of ALT, CTRL, SHIFT keys are accepted.

ShortCode has not depended any library. You can easily add the script to your page and start adding your commands.

```HTML
<script src="_path_to_your_scripts/uxrocket.shorcodes.js">
```

Defining a new keyboard command

```JavaScript
uxshortcode.addCommand('CTRL ALT T', function() { // your callback command });
```

Removing a command

```JavaScript
uxshortcode.removeCommand('CTRL ALT T');
```

