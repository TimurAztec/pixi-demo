# pixi-demo
## How to lauch project
(You have to have Node JS installed)
<br>
Open console and type consecutively:
### `npm install`
Wait untill in download all packages and then type
### `npm start`
Project will start on http://localhost:1234
or other port if 1234 is busy, port will be displayed in console
<br>
Open your browser and open 
### `http://localhost:[displayed port]`
## Example of how the app works
<img alt="" src="example/img/1.jpg"/>
Goal of this application is to demonstrate features of PIXI.js
<br>
You can see a bunch of different color and size shapes that fall from the top of the scene
If you click on one of those shapes it will disappear and change color of similar shapes. And if you click on free space new random shape will be created.
<img alt="" src="example/img/2.png"/>
Here you can see a bunch of different indicators which display such things as:
<br>
- Number of shapes that are currently on screen <br>
- Area in square pixels that is occupied by shapes on screen <br>
- Number of shapes that generates every second <br>
- Gravity or speed at which shapes are approaching the bottom of the screen
<img alt="" src="example/img/3.png"/>
Also you can control "Number of shapes per second" and "Gravity" values via buttons bellow the screen.
