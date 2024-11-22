for var in $(printenv | grep '^NEXT_APP_' | awk -F= '{print $1}'); do
  placeholder="/?__${var}__"
  value=$(eval echo \$$var)
  
  find /usr/share/nginx/html -type f -exec sed -i -E "s|${placeholder}|${value}|g" {} +
done