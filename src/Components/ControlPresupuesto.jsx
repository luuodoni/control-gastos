import { useEffect, useState } from "react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'



function ControlPresupuesto({presupuesto, gastos, setIsValidPresupuesto, setGastos, setPresupuesto}) {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado] = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total, 0)
        
        const totalDisponible = presupuesto - totalGastado;
        
        //Calcular procentaje grafica
        const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto) * 100).toFixed(2);
        

        setGastado(totalGastado)
        setDisponible(totalDisponible)

        setTimeout(() => {
            setPorcentaje(nuevoPorcentaje)
        }, 1500);
        
    }, [gastos])

    const formatearCantidad = (cantidad) => {
        return cantidad.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD'
        })
    }

    const handleResetApp = () => {
        const resultado =  confirm('Deseas reiniciar presupuesto y gastos?')

        if(resultado) {
            setGastos([])
            setPresupuesto(0)
            setIsValidPresupuesto(false)
        }
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <p>
                <CircularProgressbar
                    value={porcentaje}
                    styles={buildStyles({
                        pathColor: porcentaje > 100 ? '#dc2626' : '#3b82f6',
                        trailColor: '#f5f5f5',
                        textColor: porcentaje > 100 ? '#dc2626' : '#3b82f6'
                    })}
                    text={`${porcentaje}% Gastado`}
                />
            </p>
        </div>

        <div className="contenido-presupuesto">

            <button
                className="reset-app"
                type="button"
                onClick={handleResetApp}
            >
                Resetear App
            </button>

            <p>
                <span>
                    Presupuesto:{' '}
                </span>
                {formatearCantidad(presupuesto)}
            </p>

            <p className={`${disponible < 0 ? 'negativo' : ''}`}>
                <span >
                    Disponible:{' '}
                </span>
                {formatearCantidad(disponible)}
            </p>

            <p>
                <span>
                    Gastado:{' '}
                </span>
                {formatearCantidad(gastado)}
            </p>
        </div>
    </div>


  )
}

export default ControlPresupuesto