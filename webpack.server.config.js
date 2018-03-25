const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AureliaPlugin } = require('aurelia-webpack-plugin');
const { ProvidePlugin, DefinePlugin } = require('webpack');
const nodeExternals = require('webpack-node-externals');

const ensureArray = (config) => config && (Array.isArray(config) ? config : [config]) || []
const when = (condition, config, negativeConfig) =>
    condition ? ensureArray(config) : ensureArray(negativeConfig)

const outDir = path.resolve(__dirname, 'dist');
const srcDir = path.resolve(__dirname, 'src');
const nodeModulesDir = path.resolve(__dirname, 'node_modules');
const baseUrl = '/';

const cssRules = [
    { loader: 'css-loader' },
    {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })] }
    }
]

const scssRules = [
    { loader: 'css-loader' },
    {
        loader: 'postcss-loader',
        options: { plugins: () => [require('autoprefixer')({ browsers: ['last 2 versions'] })] }
    },
    {
        loader: 'sass-loader'
    }
];

module.exports = ({ production, server, extractCss, coverage, ssr } = {}) => ({
    target: 'node',
    node: {
        __dirname: true
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [srcDir, 'node_modules'],
    },
    entry: {
        server: './src/server-main'
    },
    externals: [nodeExternals({
        whitelist: [
            /font-awesome|bootstrap|-loader|aurelia-(?!pal-nodejs|pal|polyfills|bootstrapper)/,
        ]
    })],
    mode: production ? 'production' : 'development',
    output: {
        path: outDir,
        publicPath: baseUrl,
        filename: production ? '[name].bundle.js' : '[name].bundle.js',
        sourceMapFilename: production ? '[name].bundle.map' : '[name].bundle.map',
        chunkFilename: production ? '[name].[chunkhash].chunk.js' : '[id].chunk.js',
        libraryTarget: 'commonjs2'
    },
    devServer: {
        contentBase: outDir,
        // serve index.html for all 404 (required for push-state)
        historyApiFallback: true,
    },
    performance: { hints: false },
    module: {
        rules: [
            // CSS required in JS/TS files should use the style-loader that auto-injects it into the website
            // only when the issuer is a .js/.ts file, so the loaders are not applied inside html templates
            {
                test: /\.css$/i,
                issuer: [{ not: [{ test: /\.html$/i }] }],
                use: extractCss ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: cssRules,
                }) : ['style-loader', ...cssRules],
            },
            {
                test: /\.css$/i,
                issuer: [{ test: /\.html$/i }],
                use: cssRules,
            },
            {
                test: /\.scss$/,
                use: extractCss ? ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: scssRules,
                }) : ['style-loader', ...scssRules]
            },
            { test: /\.html$/i, loader: 'html-loader' },
            { test: /\.ts$/i, loader: 'ts-loader', exclude: nodeModulesDir },
            { test: /\.json$/i, loader: 'json-loader' },
            // exposes jQuery globally as $ and as jQuery:
            { test: require.resolve('jquery'), loader: 'expose-loader?$!expose-loader?jQuery' },
            // embed small images and fonts as Data Urls and larger ones as files:
            { test: /\.(png|gif|jpg|cur)$/i, loader: 'url-loader', options: { limit: 8192 } },
            { test: /\.woff2(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff2' } },
            { test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'url-loader', options: { limit: 10000, mimetype: 'application/font-woff' } },
            // load these fonts normally, as files:
            { test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/i, loader: 'file-loader' },
            ...when(coverage, {
                test: /\.[jt]s$/i, loader: 'istanbul-instrumenter-loader',
                include: srcDir, exclude: [/\.{spec,test}\.[jt]s$/i],
                enforce: 'post', options: { esModules: true },
            })
        ]
    },
    plugins: [
        new AureliaPlugin({
            features: {
                polyfills: "none"
            }
        }),
        new ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery',
            'fetch': 'imports-loader?this=>global!exports-loader?global.fetch!isomorphic-fetch'
        }),
        new CopyWebpackPlugin([
            { from: 'favicon.ico', to: 'favicon.ico' },
            { from: 'node_modules/preboot/__dist/preboot_browser.js', to: 'preboot_browser.js' }
        ]),
        ...when(extractCss, new ExtractTextPlugin({
            filename: production ? '[contenthash].css' : '[id].css',
            allChunks: true,
        }))
    ],
})
