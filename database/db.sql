-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-07-2024 a las 18:40:51
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
  `Nombre_contrato` text NOT NULL,
  `Nombre_tecnico` varchar(200) NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `contratos`
--

INSERT INTO `contratos` (`Id_contrato`, `Nombre_contrato`, `Nombre_tecnico`, `Nombre_material`, `Cantidad`, `Fecha`) VALUES
(1, 'LG127912', 'Jhon Jairo Ballesteros', 'Conectores RG6', 4, '2022-10-11'),
(2, 'LG120724', 'Jhon Jairo Ballesteros', 'Spliter 2 vias', 1, '2022-10-11'),
(3, 'LG120724', 'Jhon Jairo Ballesteros', 'Conectores RG6', 6, '2022-10-11'),
(4, 'LG120724', 'Jhon Jairo Ballesteros', 'Router s/n 2209544003931', 1, '2022-10-11'),
(5, 'LG120724', 'Jhon Jairo Ballesteros', 'Onu Azul Xpon S/N 9426B53ADF8', 1, '2022-10-11'),
(6, 'LG120724', 'Nestor Jaime Parra', 'Fast Conector', 4, '2022-10-12'),
(7, 'LG120722', 'Nestor Jaime Parra', 'onu mac: E89FEC0C6838', 1, '2022-10-12'),
(8, 'LG120722', 'Nestor Jaime Parra', 'Fast Conector', 2, '2022-10-12'),
(9, 'LG120722', 'Nestor Jaime Parra', 'Rosetas', 1, '2022-10-12'),
(10, 'LG120722', 'Nestor Jaime Parra', 'Patch Core (Amarillo)', 1, '2022-10-12'),
(11, 'LG120722', 'Nestor Jaime Parra', 'Conectores RG6', 6, '2022-10-12'),
(12, 'LG101010', 'Jean Paul', 'PLC 1*8', 12, '2024-07-10'),
(13, 'LG0101', 'Jean Paul', 'PLC 1*8 ', 34, '2024-07-11'),
(14, 'LG0101', 'Jean Paul', 'PLC 1*8 ', 24, '2024-07-12'),
(15, 'LG0101', 'Jean Paul', 'PLC 1*8 ', 100, '2024-07-12'),
(16, 'LG0101', 'Jean Paul', 'PLC 1*8 ', 1100, '2024-07-12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `devolucion`
--

CREATE TABLE `devolucion` (
  `Id_devolucion` int(11) NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Estado` text NOT NULL,
  `Fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `devolucion`
--

INSERT INTO `devolucion` (`Id_devolucion`, `Nombre_material`, `Cantidad`, `Estado`, `Fecha`) VALUES
(6, 'PLC 1*16', 9, 'Bueno', '2024-07-08'),
(7, 'PLC 1*8', 12, 'Bueno', '2024-07-08'),
(8, 'PLC 1*8', 12, 'Bueno', '2024-07-08'),
(9, 'PLC 1*8 ', 14, 'Bueno', '2024-07-08'),
(10, 'PLC 1*8 ', 14, 'Bueno', '2024-07-08'),
(11, 'PLC 1*8 ', 50, 'Malo', '2024-07-09'),
(12, 'PLC 1*8 ', 50, 'Bueno', '2024-07-09'),
(13, 'PLC 1*8', 50, 'Bueno', '2024-07-09'),
(14, 'PLC 1*8 ', 50, 'Bueno', '2024-07-09'),
(15, 'PLC 1*8 ', 100, 'Bueno', '2024-07-10'),
(16, 'PLC 1*8 ', 199, 'Bueno', '2024-07-12'),
(17, 'PLC 1*8 ', 12, 'Bueno', '2024-07-12'),
(18, 'PLC 1*8 ', 321, 'Bueno', '2024-07-12'),
(19, 'Pretales ', 10, 'Bueno', '2024-07-14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `login`
--

CREATE TABLE `login` (
  `username` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `login`
--

INSERT INTO `login` (`username`, `password`, `isAdmin`) VALUES
('user1', '1234', 1),
('user2', '1234', 0),
('user3', '1234', 0),
('user4', '1234', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocksistema`
--

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
(12, 'PLC 1*8 ', 732, 'Bueno'),
(13, 'PLC 1*16', 9, 'Bueno'),
(14, 'PLC 1*16 Sin Conectores ', 5, 'Bueno'),
(15, 'PLC 1*4 ', 43, 'Bueno'),
(16, 'PLC 1*2', 19, 'Bueno'),
(17, 'PLC 1*1', 29, 'Bueno'),
(18, 'PLC 1*6', 1, 'Bueno'),
(19, 'Patch Core (Amarillo)', 0, 'Bueno'),
(20, 'Fast Conector ', 257, 'Bueno'),
(21, 'Capuchas Negras', 10, 'Bueno'),
(22, 'Conectores RG6', 1501, 'Bueno'),
(23, 'Amarras Amarillas ', 855, 'Bueno'),
(24, 'Amarras ', 0, 'Bueno'),
(25, 'Grapas (paquete de 50)', 0, 'Bueno'),
(26, 'Conectores RG45', 1052, 'Bueno'),
(27, 'Conectores RG81', 77, 'Bueno'),
(28, 'Hebillas Band', 99, 'Bueno'),
(29, 'Spliter 2 vias', 146, 'Bueno'),
(30, 'Fast Corector ( Malos)', 10, 'Bueno'),
(31, 'Acoples de Roseta', 0, 'Bueno'),
(32, 'Cargador', 93, 'Bueno'),
(33, 'Decodificadores', 7, 'Bueno'),
(34, 'Cinta Amarilla', 1, 'Bueno'),
(35, 'Conos', 2, 'Bueno'),
(36, 'Arnes', 3, 'Bueno'),
(37, 'Pretales ', 12, 'Bueno'),
(38, 'Sonda de 15 mt', 2, 'Bueno'),
(39, 'Sonda 30 mt', 2, 'Bueno'),
(40, 'Escaleras', 2, 'Bueno'),
(41, 'Taladro', 2, 'Bueno'),
(42, 'Cascos ', 2, 'Bueno'),
(43, 'Computador Portatil ', 0, 'Bueno'),
(44, 'Cable UTP', 0, 'Bueno'),
(45, 'Router s/n 2209544003931', 0, 'Bueno'),
(46, 'Pantalones ', 3, 'Bueno'),
(47, 'Camisas (Guerrera)', 4, 'Bueno'),
(48, 'Maletin ', 3, 'Bueno'),
(49, 'Botas', 3, 'Bueno'),
(50, 'Cable Coaxial ', 3660, 'Bueno'),
(69, 'Tap de 9272 vias', 12, 'Bueno'),
(70, 'PLC 1*823', 12, 'Bueno'),
(71, 'PLC 1*88372', 23, 'Bueno');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `stocktecnico`
--

CREATE TABLE `stocktecnico` (
  `Id_stocktecnico` int(11) NOT NULL,
  `Nombre_tecnico` varchar(200) NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Fecha_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `stocktecnico`
--

INSERT INTO `stocktecnico` (`Id_stocktecnico`, `Nombre_tecnico`, `Nombre_material`, `Cantidad`, `Fecha_modificacion`) VALUES
(9, 'Jean Paul', 'PLC 1*8 ', 0, '2024-07-14 15:25:36'),
(14, 'Jean Paul', 'Taladro', 0, '2024-07-14 15:21:18'),
(16, 'Jean Paul', 'PLC 1*16 Sin Conectores ', 0, '2024-07-14 15:20:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tecnicos`
--

CREATE TABLE `tecnicos` (
  `Id_tecnico` int(11) NOT NULL,
  `Cedula` int(11) NOT NULL,
  `Nombre` varchar(200) NOT NULL,
  `Telefonos` varchar(200) NOT NULL,
  `Fecha_licencia` date NOT NULL,
  `Vencimiento_licencia` date NOT NULL,
  `Cargo` varchar(200) NOT NULL,
  `Estado` tinyint(1) NOT NULL,
  `Fecha_creacion` date NOT NULL,
  `Fecha_modificacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish2_ci;

--
-- Volcado de datos para la tabla `tecnicos`
--

INSERT INTO `tecnicos` (`Id_tecnico`, `Cedula`, `Nombre`, `Telefonos`, `Fecha_licencia`, `Vencimiento_licencia`, `Cargo`, `Estado`, `Fecha_creacion`, `Fecha_modificacion`) VALUES
(1, 121345, 'JoseMiranda', '23232332', '2023-12-12', '2023-12-12', 'Admin', 1, '2024-07-01', '2024-07-08 14:17:00'),
(2, 12345, 'Jean Paul', '32862', '2023-12-12', '2023-12-12', 'Admin', 1, '2024-07-08', '2024-07-08 15:18:27'),
(3, 923623, 'Vanesa Muñoz', '3293823', '2024-07-16', '2024-07-19', 'Admin', 1, '2024-07-08', '2024-07-08 15:38:27'),
(5, 3404294, 'Carolina Herrera', '389123', '2024-07-08', '2024-07-29', 'Administrador', 0, '2024-07-08', '2024-07-08 17:30:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `traslados`
--

CREATE TABLE `traslados` (
  `Id_traslado` int(11) NOT NULL,
  `Sede_origen` text NOT NULL,
  `Sede_destino` text NOT NULL,
  `Nombre_material` varchar(200) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Fecha` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `traslados`
--

INSERT INTO `traslados` (`Id_traslado`, `Sede_origen`, `Sede_destino`, `Nombre_material`, `Cantidad`, `Fecha`) VALUES
(1, 'Molivento', 'Frailes', 'PLC 1*8', 12, '2024-07-14 16:35:39');

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
  ADD PRIMARY KEY (`Id_stocksistema`),
  ADD UNIQUE KEY `Nombre_material` (`Nombre_material`) USING HASH;

--
-- Indices de la tabla `stocktecnico`
--
ALTER TABLE `stocktecnico`
  ADD PRIMARY KEY (`Id_stocktecnico`);

--
-- Indices de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  ADD PRIMARY KEY (`Id_tecnico`),
  ADD UNIQUE KEY `Nombre` (`Nombre`);

--
-- Indices de la tabla `traslados`
--
ALTER TABLE `traslados`
  ADD PRIMARY KEY (`Id_traslado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contratos`
--
ALTER TABLE `contratos`
  MODIFY `Id_contrato` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `devolucion`
--
ALTER TABLE `devolucion`
  MODIFY `Id_devolucion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `stocksistema`
--
ALTER TABLE `stocksistema`
  MODIFY `Id_stocksistema` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `stocktecnico`
--
ALTER TABLE `stocktecnico`
  MODIFY `Id_stocktecnico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `tecnicos`
--
ALTER TABLE `tecnicos`
  MODIFY `Id_tecnico` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `traslados`
--
ALTER TABLE `traslados`
  MODIFY `Id_traslado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
