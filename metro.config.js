const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

// ✅ Permitir arquivos .cjs
defaultConfig.resolver.sourceExts.push("cjs");

// ✅ Corrigir erro de "exports" em alguns pacotes (como @tabler/icons-react-native)
defaultConfig.resolver.unstable_enablePackageExports = false;

// ✅ Adicionar alias @ para a pasta src
defaultConfig.resolver.extraNodeModules = {
  "@": path.resolve(__dirname, "src"),
};

module.exports = defaultConfig;
