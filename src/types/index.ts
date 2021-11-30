export interface UseStatusResponse {
  /**
   *
   * References when there is no connection to the active mount server:
   * 
   * @default false
   */
  isOffline: boolean
  /**
   *
   * Does the PWI4 client have an active connection to the mount hardware?
   * 
   * @default false
   */
  isConnected: boolean
  /**
   *
   * When the mount is first commanded to follow a new target, this flag reports 
   * true while the mount is moving to acquire the target. Once the target is 
   * acquired, or if the movement is stopped, this flag reports false. 
   * 
   * If the PWI4 client is not connected to the mount, the value will be false.
   * 
   * @default false
   */
  isSlewing: boolean
  /**
   *
   * When the mount is trying to follow a target, this flag reports true. 
   * If isSlewing is also true, then the mount has not yet acquired the 
   * target. When the mount is stopped, this flag reports false.
   * 
   * @default false
   */
  isTracking: boolean
  /**
   *
   * The telescope’s current position in degrees of altitude. 0 degrees is the 
   * horizon, and 90 degrees is zenith. This value incorporates pointing 
   * model corrections.
   * 
   * If PWI4 is not connected to the mount, this value will be 0.
   * 
   * @default Infinity
   */
  alt: number
  /**
   *
   * The telescope’s current position in degrees of azimuth. North is defined 
   * as 0 degrees, and East is 90 degrees. This value incorporates pointing 
   * model corrections.
   * 
   * If PWI4 is not connected to the mount, this value will be 0.
   * 
   * @default Infinity
   */
  az: number
}