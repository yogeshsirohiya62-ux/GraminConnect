const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const path = require('path');
const deps = require('./package.json').dependencies;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production' || process.env.NODE_ENV === 'production';

  const plugins = [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ];

  // In development, enable Module Federation for multi-port micro-frontend testing
  if (!isProduction) {
    plugins.push(
      new ModuleFederationPlugin({
        name: 'host',
        remotes: {
          dashboard: 'dashboard@http://localhost:3001/remoteEntry.js',
        },
        shared: {
          ...deps,
          react: { singleton: true, requiredVersion: deps.react },
          'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
          zustand: { singleton: true, requiredVersion: deps.zustand },
        },
      })
    );
  }

  // Workbox Service Worker in Production
  if (isProduction) {
    plugins.push(
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
          },
          {
            urlPattern: /\/api\/data\//,
            handler: 'StaleWhileRevalidate',
          },
          {
            urlPattern: /\/api\/auth\//,
            handler: 'NetworkFirst',
          }
        ]
      })
    );
  }

  return {
    entry: './src/index',
    mode: isProduction ? 'production' : 'development',
    devServer: {
      port: 3000,
      historyApiFallback: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:5000',
        },
      ],
    },
    output: {
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          options: {
            presets: [
              ['@babel/preset-env', { modules: false }], 
              ['@babel/preset-react', { runtime: 'automatic' }]
            ],
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ],
    },
    plugins,
  };
};
