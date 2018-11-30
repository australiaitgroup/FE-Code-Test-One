# Search Hacker News

It is a hacker news searching app for user to search stories of hacker news which is powered by Algolia. You can do wild card search with only typing keyword in the searching input field and getting search result with highlighted keyword instantly. you can also sort by popularity/date, filter it with a limited timeframe and switch between different pages to locate what you would like to read.

just access https://searchclient.azurewebsites.net/

# File Path Structure

    --src
      --__test__
          --index.test.tsx  // testing mounting components' state and props.
          --listItem.test.tsx // testing searched list result.
      --app
          --index.tsx   //main program of this app 
      --components      
          --listItem.tsx // item detail of search result
          --notFound.tsx // Not found page when not records matching your input keyword
          --searchAppBar.tsx // responsive search app bar
          --searchList.tsx // its is a list for wrapping list items
          --withRoot.tsx // make material ui compatible to Typescript


# Set Up Local env

1. clone the package to your local
2. run "npm install"
3. run "npm run serve" to start local server, you can find more details on package.json for more script commands.
4. access http://localhost:3000/ to play
5. have fun ^_^

