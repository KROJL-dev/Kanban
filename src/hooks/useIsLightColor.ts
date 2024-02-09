import tinycolor from 'tinycolor2'

export default function (color: string): boolean {
  return tinycolor(color).isLight()
}
