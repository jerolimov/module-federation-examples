const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('@module-federation/enhanced');
const { RsdoctorWebpackPlugin } = require('@rsdoctor/webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const isDevelopment = !isProd;

const deps = require('./package.json').dependencies;
module.exports = {
  entry: './src/index',
  cache: false,
  devServer: {
    port: 3001,
    hot: isDevelopment,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  mode: 'development',
  devtool: 'source-map',

  optimization: {
    minimize: false,
  },

  output: {
    uniqueName: 'app1',
    publicPath: 'auto',
  },

  resolve: {
    extensions: ['.jsx', '.js', '.json', '.mjs'],
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        type: 'javascript/auto',
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve('babel-loader'),
            options: {
              presets: [require.resolve('@babel/preset-react')],
              plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.md$/,
        loader: 'raw-loader',
      },
    ],
  },

  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    // new webpack.NormalModuleReplacementPlugin(/.*/, function (resource) {
    //   console.log('request', request);
    // }),
    new ModuleFederationPlugin({
      name: 'app_01',
      filename: 'remoteEntry.js',
      remotes: {
        app_02: 'app_02@http://localhost:3002/remoteEntry.js',
        app_03: 'app_03@http://localhost:3003/remoteEntry.js',
        app_04: 'app_04@http://localhost:3004/remoteEntry.js',
        app_05: 'app_05@http://localhost:3005/remoteEntry.js',
        // '@mui/material/Button': 'resolve'
      },
      exposes: {
        './SideNav': './src/SideNav',
        './Page': './src/Page',
      },
      shared: {
        // ...deps,
        react: {
          eager: true,
          singleton: true,
          version: '*'
        },
        'react-dom': {
          eager: true,
          singleton: true,
          version: '*'
        },
        'react-router-dom': {
          eager: true,
          singleton: true,
          version: '*'
        },

        '@material-ui/core': {
          eager: true,
          singleton: true,
          version: '*'
        },

        '@mui/material': {
          eager: true,
          shareKey: '@mui/material',
          shareScope: '@mui/material',
          singleton: true,
          version: '*'
        },
        '@mui/material/Button': {
          eager: true,
          shareKey: '@mui/material',
          shareScope: '@mui/material',
          singleton: true,
          version: '*'
        },
        '@mui/material/colors': {
          eager: true,
          shareKey: '@mui/material',
          shareScope: '@mui/material',
          singleton: true,
          version: '*'
        },
        '@mui/material/styles': {
          eager: true,
          shareKey: '@mui/material',
          shareScope: '@mui/material',
          singleton: true,
          version: '*'
        },

        // '@mui/material': singletonAnyVersion,
        // '@mui/material/styles': singletonAnyVersion,
        '@emotion/cache': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/css': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/react': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/serialize': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/memoize': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/weak-memoize': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/sheet': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/provider': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/styled': {
          eager: true,
          singleton: true,
          version: '*'
        },
        '@emotion/utils': {
          eager: true,
          singleton: true,
          version: '*'
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // new RsdoctorWebpackPlugin({
    //   // plugin options
    // }),
  ].filter(Boolean),
};
