const formatCountryName = value => {
  if (!value) return
  return value.replace(/(.*)\s\((.*)\)/, '$2 $1').replace(/(.*),(.*)/, '$2 $1')
}

export { formatCountryName }
