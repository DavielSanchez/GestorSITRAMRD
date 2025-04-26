import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { Warning, Traffic, CloudQueue, Done, DoneAll } from '@mui/icons-material';
import BuildIcon from '@mui/icons-material/Build';
import InfoIcon from '@mui/icons-material/Info';

export default function NotificationItem({alerta}) {

  const tiempoPasado = formatDistanceToNow(new Date(alerta.fecha_creacion), {
    addSuffix: true,
    locale: es,
  });
    return (
      <div className="flex items-start gap-2">
        {/* Icono/avatar circular gris */}
        {/* <div className="w-10 h-10 rounded-full bg-[#d9d9d9] flex-shrink-0" /> */}
        {alerta.tipo === 'emergencia' ? (
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FF5353] flex-shrink-0" >
                      <Warning />
                      </div>
                    ) : alerta.tipo === 'trafico' ? (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FD713E] flex-shrink-0" >
                     <Traffic />
                      </div>
                    ) : alerta.tipo === 'clima' ? (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#000DFF] flex-shrink-0" >
                      <CloudQueue />
                      </div>
                    ) : alerta.tipo === 'operativa' ? (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#FFCC00] flex-shrink-0" >
                      <BuildIcon />
                      </div>
                    ) : alerta.tipo === 'informativa' ? (
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-[#03B7BD] flex-shrink-0" >
                      <InfoIcon />
                      </div>
                    ) : null}
        {/* Texto de la notificación */}
        <div className="leading-5">
          <div className="text-[#212121] text-sm font-medium">
            {alerta.titulo}
          </div>
          <div className="text-[#9e9e9e] text-xs">
          {tiempoPasado}
          </div>
        </div>
      </div>
    );
  }