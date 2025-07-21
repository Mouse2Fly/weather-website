import cloudy from '@bybas/weather-icons/design/fill/animation-ready/cloudy.svg';
import clearDay from '@bybas/weather-icons/design/fill/animation-ready/clear-day.svg';
import clearNight from '@bybas/weather-icons/design/fill/animation-ready/clear-night.svg';
import partlyCloudyDay from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day.svg';
import partlyCloudyNight from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-night.svg';
import rain from '@bybas/weather-icons/design/fill/animation-ready/rain.svg';
import partlyCloudyDayRain from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day-rain.svg';
import partlyCloudyNightRain from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-night-rain.svg';
import partlyCloudyDaySnow from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-day-snow.svg';
import partlyCloudyNightSnow from '@bybas/weather-icons/design/fill/animation-ready/partly-cloudy-night-snow.svg';
import thunderstorms from '@bybas/weather-icons/design/fill/animation-ready/thunderstorms.svg';
import mist from '@bybas/weather-icons/design/fill/animation-ready/mist.svg';

    // clear - giedra;
    // partly-cloudy - mažai debesuota;
    // cloudy-with-sunny-intervals - debesuota su pragiedruliais;
    // cloudy - debesuota;
    // light-rain - nedidelis lietus;
    // rain - lietus;
    // heavy-rain - smarkus lietus;
    // thunder - perkūnija;
    // isolated-thunderstorms - trumpas lietus su perkūnija;
    // thunderstorms - lietus su perkūnija;
    // heavy-rain-with-thunderstorms - smarkus lietus su perkūnija;
    // light-sleet - nedidelė šlapdriba;
    // sleet - šlapdriba;
    // freezing-rain - lijundra;
    // hail - kruša;
    // light-snow - nedidelis sniegas;
    // snow - sniegas;
    // heavy-snow - smarkus sniegas;
    // fog - rūkas;
    // null - oro sąlygos nenustatytos.

const codeMapping = {
  '01d': clearDay,
  '01n': clearNight,
  '02d': partlyCloudyDay,
  '02n': partlyCloudyNight,
  '03d': cloudy,
  '03n': cloudy,
  '04d': cloudy,
  '04n': cloudy,
  '09d': rain,
  '09n': rain,
  '10d': partlyCloudyDayRain,
  '10n': partlyCloudyNightRain,
  '11d': thunderstorms,
  '11n': thunderstorms,
  '13d': partlyCloudyDaySnow,
  '13n': partlyCloudyNightSnow,
  '50d': mist,
  '50n': mist
};

type WeatherIconProps = {
  code: keyof typeof codeMapping;
  alt?: string;
};

const WeatherIcon = (props: WeatherIconProps) => (
  <img src={codeMapping[props.code]} alt={props.alt} width="100px" />
);

export default WeatherIcon;
