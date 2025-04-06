import { useThemeStore } from '../store/themeStore';
import { useWeatherStore } from '../store/weatherStore';
import { Rain } from './Rain';
import { Wind } from './Wind';
import { Snow } from './Snow';
import { Model as Towers } from '../models/Towers';
import { Model as Walls1 } from '../models/Walls1';
import { Model as Stairs1 } from '../models/Stairs1';
import { Model as Bridge } from '../models/Bridge';
import { Model as Stairs2 } from '../models/Stairs2';
import { Model as Walls2 } from '../models/Walls2';
import { Model as Castle } from '../models/Castle';
import { ParticleField } from './ParticleField';

export const Scene = () => {
  useThemeStore();
  const { currentWeather } = useWeatherStore();

  return (
    <>
      <Towers />
      <Walls1 />
      <Stairs1 />
      <Bridge />
      <Stairs2 />
      <Walls2 />
      <Castle />

      <group position={[0, -0.5, -4]} rotation={[0, Math.PI, 0]}>
        <ParticleField />
      </group>

      {currentWeather === 'rainy' && <Rain />}
      {currentWeather === 'windy' && <Wind />}
      {currentWeather === 'snowy' && <Snow />}
    </>
  );
};