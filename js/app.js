document.addEventListener('DOMContentLoaded', () => {

    const climaUsuario = document.querySelector('.sec__clima')
    
    console.log(climaUsuario)

    obtenerLatitudLongitud();
    mostrarClimaCiudes();
    
    function obtenerLatitudLongitud () {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                let latitud = position.coords.latitude
                let longitud = position.coords.longitude
                console.log(latitud, longitud)
                obtenerClimaHora(latitud, longitud)
            })
        }else{
            console.log('hubo un error')
        }
   }
   
   
   
   async function obtenerClimaHora  (latitud, longitud) {
        const key = '2b305071c0ccb4ae2006870be1a1a3d5'
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${key}`;
        const respueta = await fetch(url)
        const data = await respueta.json();

        if (data.cod ==='404') {
            console.log('error de ubicacion');
            return;
        }
        console.log(data)
        mostrarClima(data)
        
    }


    function mostrarClima(data) {
        const { name,weather, main:{temp, temp_max, temp_min}} = data;
        console.log(weather[0].icon)
       
        const centigrados = kelvinCentigrados(temp)
        const max = kelvinCentigrados(temp_max)
        const min = kelvinCentigrados(temp_min)

        // Obtener la hora actual del usuario
        let fecha = new Date();
        let minutos = fecha.getMinutes();
        let hora = fecha.getHours();

        // Agregar un cero antes de los minutos si es necesario
        if (minutos < 10) {
          minutos = '0' + minutos;
         }

         console.log(fecha, minutos, hora)

         const ubicacionUsuario = document.createElement('p')
         ubicacionUsuario.textContent = `${name} `;
         ubicacionUsuario.classList.add('sec__ubicacionUsuario')

         const climaActual = document.createElement('p')
         climaActual.innerHTML = `${centigrados} &#8451; | ` 
         climaActual.classList.add('temperatura')

         const climaMaximo = document.createElement('p')
         climaMaximo.innerHTML = `${max}`

         const iconHora = document.createElement('i');
         iconHora.className = 'bx bxs-stopwatch bx-tada bx-flip-horizontal icon' ;

         const imagenClima = document.createElement('img')
         imagenClima.src = `https://api.openweathermap.org/img/w/${weather[0].icon}.png `
         imagenClima.alt = 'Imagen clima'

         const horaactual = document.createElement('p')
         horaactual.classList.add('temperatura')
         horaactual.textContent = `${hora}:${minutos}`

         const contenedorClimaHora = document.createElement('div')
         contenedorClimaHora.classList.add('sec__flex')

         contenedorClimaHora.appendChild(imagenClima)
         contenedorClimaHora.appendChild(climaActual)
         contenedorClimaHora.appendChild(iconHora)
         contenedorClimaHora.appendChild(horaactual)
        //  contenedorClimaHora.appendChild(climaMaximo)
     
         climaUsuario.appendChild(ubicacionUsuario)
         climaUsuario.appendChild(contenedorClimaHora)

    }
    
   async function mostrarClimaCiudes (){
       const cuidadesClima = ['La Paz', 'Cochabamba','Santa Cruz','Beni']
       const key = '2b305071c0ccb4ae2006870be1a1a3d5'

        for (let i = 0; i < cuidadesClima.length; i++) {
            console.log(cuidadesClima[i])
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cuidadesClima[i]},Bolivia, &appid=${key}`;
            
            const respueta = await fetch(url);
            const data = await respueta.json();
            console.log(data)

            generarHtml(data)


        }
    }

    function generarHtml(climaCiudades){
        const { name,weather, main:{temp, temp_max, temp_min}} = climaCiudades

        const centigrados = kelvinCentigrados(temp)
        const max = kelvinCentigrados(temp_max)
        const min = kelvinCentigrados(temp_min)

        const cuidadesClima = document.querySelector('.sec__clima--cuidades')

        const contenedorClima = document.createElement('div')
        contenedorClima.classList.add('sec__ciudadesClima') 

        const infomacionClima = document.createElement('section')
        infomacionClima.classList.add('sec__descripcion')

        const nombreCuidades = document.createElement('p')
        nombreCuidades.classList.add('title__ciudad')
        nombreCuidades.textContent = `${name}`

        const cuidadesTemperatura = document.createElement('p')
        cuidadesTemperatura.classList.add('temperatura__cuidades')
        cuidadesTemperatura.innerHTML = `${centigrados} &#8451;`
        
        const imagenClima = document.createElement('img')
        imagenClima.classList.add('img__clima')
         imagenClima.src = `https://api.openweathermap.org/img/w/${weather[0].icon}.png `
         imagenClima.alt = 'Imagen clima'

        infomacionClima.appendChild(cuidadesTemperatura)
        infomacionClima.appendChild(imagenClima )
        
        contenedorClima.appendChild(nombreCuidades)
        contenedorClima.appendChild(infomacionClima)

        cuidadesClima.appendChild(contenedorClima)



    }

    function kelvinCentigrados(grados){
        return parseInt(grados-273.15)
    }
})
