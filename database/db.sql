-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-06-2024 a las 23:35:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `legon`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contratos`
--

CREATE TABLE `contratos` (
  `Id_contrato` int(11) NOT NULL,
  `Numero_contrato` text NOT NULL,
  `Nombre_tecnico` varchar(200) NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devolucion`
--

CREATE TABLE `devolucion` (
  `Id_devolucion` int(11) NOT NULL,
  `Remision` int(11) NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `stocksistema` (
  `Id_stocksistema` int(11) NOT NULL,
  `Nombre_material` text NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Estado` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `stocksistema`
--

INSERT INTO `stocksistema` (`Id_stocksistema`, `Nombre_material`, `Cantidad`, `Estado`) VALUES
(1, 'Tap de 9 vias', 100, 'Bueno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocktecnico`
--

CREATE TABLE `stocktecnico` (
  `Id_stocktecnico` int(11) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `Nombre_tecnico` varchar(200) NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` varchar(11) NOT NULL,
  `Fecha_modificacion` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicos`
--

CREATE TABLE `tecnicos` (
  `Id_tecnico` int(11) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `Nombres` varchar(200) NOT NULL,
  `Apellidos` varchar(200) NOT NULL,
  `Telefonos` varchar(200) NOT NULL,
  `Fecha_licencia` varchar(200) NOT NULL,
  `Vencimiento_licencia` varchar(200) NOT NULL,
  `Cargo` varchar(200) NOT NULL,
  `Estado` varchar(200) NOT NULL,
  `Fecha_creacion` varchar(200) NOT NULL,
  `Fecha_modificacion` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `traslados`
--

CREATE TABLE `traslados` (
  `Id_translados` int(11) NOT NULL,
  `Remision` int(11) NOT NULL,
  `Sede` text NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Fecha` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contratos`
--
ALTER TABLE `contratos`
  ADD PRIMARY KEY (`Id_contrato`);

--
-- Indices de la tabla `devolucion`
--
ALTER TABLE `devolucion`
  ADD PRIMARY KEY (`Id_devolucion`);

--
-- Indices de la tabla `login`
--
ALTER TABLE `login`
  ADD PRIMARY KEY (`username`,`password`);

--
-- Indices de la tabla `stocksistema`
--
ALTER TABLE `stocksistema`
  ADD PRIMARY KEY (`Id_stocksistema`);

--
-- Indices de la tabla `traslados`
--
ALTER TABLE `traslados`
  ADD PRIMARY KEY (`Id_translados`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `Id_contrato` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `devolucion`
--
ALTER TABLE `devolucion`
  MODIFY `Id_devolucion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `stocksistema`
--
ALTER TABLE `stocksistema`
  MODIFY `Id_stocksistema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `traslados`
--
ALTER TABLE `traslados`
  MODIFY `Id_translados` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
