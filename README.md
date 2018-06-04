# [AcademiaLagunensis](http://www.academialagunensis.es/)
Servidor web de la Academia Lagunensis implementado en [NodeJS](https://nodejs.org/es/) con [ExpressJS](http://expressjs.com/es/), [Pug](https://pugjs.org/api/getting-started.html) como motor de plantillas html y haciendo uso de [MaterializeCSS](https://materializecss.com/) como hojas de estilo.

## Descripción
El sitio web pretende ser una plataforma destinada a la obtención de información sobre la academia de tal manera que las 
personas interesadas puedan hacerse una idea de la misma.

## Acceso a la página web
Puede acceder a la página web desde el siguiente [link](http://www.academialagunensis.es/)

## Cómo se ha desplegado la aplicación
El servidor ha sido desplegado en el servicio de [___Amazon Web Services___](https://aws.amazon.com/es/).

Para ello hemos hehco uso del servicio que ellos denominan [___Elastic Beansalk___](https://aws.amazon.com/es/elasticbeanstalk/?nc2=h_m1) en la que nosotros solamente tenemos que configurar el entorno y el servicio se encarga automáticamente de levantar una instancia de la máquina virtual con la aplicación en ejecución.

Además, hemos utilizado la herramienta [___CodePipeline___](https://aws.amazon.com/es/codepipeline/?nc2=h_m1) que nos proporciona la automatización del despliegue del código cada vez que se realicen cambios en la rama _master_ del repositorio.
