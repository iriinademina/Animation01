
document.routePoints = [
    [ 50, 50 ], [ 350, 80 ], [ 580, 190 ], [ 160, 320 ]
]

document.pointPicture="./images/christmas-tree-lights-animated.gif"


var Personage = function ( params ) {
    this.element = document.createElement ( 'img' )
    this.element.src = !params || !params.imgURL ?
                  this.defaultPersonageImage : params.imgURL
    document.body.appendChild ( this.element )
    this.elementStyling ( this.element, this.personageStyle )

    this.pointImage = !params || !params.pointImage
                        ? this.defaultPointImage
                        : params.pointImage
    this.route =  !params || !params.routePoints ||
    						  !Array.isArray ( params.routePoints ) ?
                  this.defaultRoute : params.routePoints
    this.setRoutePoints ()
    this.nextPoint = 1
    this.currentPosition = this.route [0]
    this.velocity = !params || !params.velocity
                            || typeof params.velocity !== "number"
                            ? 5 : params.velocity
    this.delay = !params || !params.timeInterval
                         || typeof params.timeInterval !== "number"
                         ? 100 : params.timeInterval
    this.startMove = function(){
          this.interval = setInterval ( this.mc_personage.bind ( this ), this.delay )}

    this.stopMove = function () {   // метод для остановки движения
        clearInterval ( this.interval )
    }.bind ( this )

   }



Personage.prototype.setRoutePoints = function () {
    for ( var item of this.route ) {
    		if ( !Array.isArray ( item ) ||
        			typeof item [0] !== 'number' ||
              typeof item [1] !== 'number'
        ) continue
        var point = document.createElement ( 'figure' )

          point.backgroundImage =  function(){
              this.defaultPointImage.forEach(function(item){
                          "url(" + item + ")"})}

       this.elementStyling ( point,
                Object.assign ( this.pointStyle, {
                    left: item [0] + 'px',
                    top:  item [1] + 'px',
                    backgroundImage: "url(" + this.pointImage + ")"
                } )
        )

        document.body.appendChild ( point )
    }
}

Personage.prototype.elementStyling = function ( elem, styleObject ) {
    for ( var s of Object.keys ( styleObject ) ) {
        elem.style [s] = styleObject [s]
    }
}

Personage.prototype.getNextPointIndex = function () {
    this.nextPoint = this.nextPoint < this.route.length - 1 ?
                      this.nextPoint + 1 : 0
}
Personage.prototype.getNextPoint = function ( ind ) {
    return this.route [ this.nextPoint ][ind]
}
Personage.prototype.getDistance = function ( ind ) {
    return this.getNextPoint ( ind ) -
            this.currentPosition [ind]
}

Personage.prototype.mc_personage = function ( event ) {
        var distance = []
        distance [0] = this.getDistance ( 0 )
        distance [1] = this.getDistance ( 1 )
      // достигли очередной точки маршрута

      this.element.style.transform = distance [0] < 0 ?
                    "rotateY(180deg)" : "rotateY(0deg)"
      this.currentPosition [0] += distance [0] !== 0 ?
              Math.sign(distance [0]) * this.velocity : 0
      this.currentPosition[1] += distance [1] !== 0 ?
              Math.sign(distance [1]) * this.velocity : 0
      this.element.style.left = this.currentPosition [0] + 'px'
      this.element.style.top = this.currentPosition [1] + 'px'
      if ( distance [0] === 0 && distance [1] === 0 )
                            this.getNextPointIndex ()
}

Personage.prototype.defaultRoute = [
		[ 50, 50 ], [ 300, 300 ], [ 100, 300 ], [ 200, 50 ]
]
Personage.prototype.defaultPersonageImage = "./images/3-santa-sleigh-reindeer.gif"
Personage.prototype.defaultPointImage = "./images/christmas-tree-white-lights.gif"


Personage.prototype.personageStyle = {
		position: "fixed",
    top: 0,
    left: 0,
    width: "90px",
    height: "auto"
}
Personage.prototype.pointStyle = {
		position: "fixed",
    top: 0,
    left: 0,
    width: "120px",
    height: "120px",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    backgroundPosition: "center center",
backgroundImage: "url(" + this.defaultPointImage + ")"
}

document.personage = new Personage ( {
      routePoints: document.routePoints,
      pointImage: document.pointPicture // добавлена другая картинка

})

var buttonStart = document.createElement('button')
buttonStart.innerHTML = "START"
document.body.appendChild(buttonStart)
buttonStart.onclick = function (event) {
        document.personage.startMove()
}

var buttonStop = document.createElement('button')
buttonStop.innerHTML = "STOP"
document.body.appendChild(buttonStop)
buttonStop.onclick= function (event) {
        document.personage.stopMove()
}

        document.personage.stopMove()
}


document.personage = new Personage ( {
      routePoints: document.routePoints
})
