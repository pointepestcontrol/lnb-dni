<?php
/*
Plugin Name: LeadsNearby DNI
Plugin URI: http://leadsnearby.com
Description: Provides Dynamic Phone Number Functionality for Various Call Tracking Solutions
Version: 1.0.0
Author: LeadsNearby
Author URI: http://leadsnearby.com
License: GPLv2
*/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

class LnbDni {
	
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu_entry' ) );
		add_action( 'admin_enqueue_scripts', array($this, 'register_backend_scripts' ));
		add_action( 'wp_enqueue_scripts', array($this, 'register_frontend_scripts' ));
	}
	
	public function add_menu_entry() {
		if (current_user_can('administrator')) {
			add_options_page('LeadsNearby DNI Settings', 'LNB-DNI', 'administrator', 'lnb-dni', array($this, 'menu_page'));
		}
	} 
	
	public function register_backend_scripts () {
		if (current_user_can('administrator')) {
			wp_enqueue_style('settings-styles', plugin_dir_url(__FILE__) . 'assets/css/settings-style.css');
			wp_enqueue_script('dni-settings-js', plugin_dir_url(__FILE__) . 'assets/js/dni-settings.js','',null, true);
		}
	}
	
	public function register_frontend_scripts() {
		$dniUrlAttributes = $this->dni_get_url_params();
		$dniData = $this->dni_get_data();
		
		wp_register_script( 'dni-url-attributes' ,'');
		wp_localize_script('dni-url-attributes', 'dniUrlAttributes', $dniUrlAttributes);
		wp_enqueue_script('dni-url-attributes');
		
		wp_register_script( 'dni-data' ,'');
		wp_localize_script('dni-data', 'dniData', $dniData);
		wp_enqueue_script('dni-data');
		
		wp_enqueue_script('dni-function-js', plugin_dir_url(__FILE__) . 'assets/js/dni-function.js','',null, true);
	}	
	
	public function menu_page() {

		if (isset($_POST['option'])) {
            $temp_setting_keys = array();
            
            foreach ($_POST['option'] as $post_settings) {
                if(in_array($post_settings['source-select'], $temp_setting_keys) || @in_array($post_settings['customer-referrer'], $temp_setting_keys )) {
                    $dup = true;
                }
                
                $temp_setting_keys[] = $post_settings['source-select'];
            }
            
            update_option('lnb-dni-settings', $_POST['option']);
            // if ($dup === false) {
                
            // } else {
                // echo '<h3 style="color: red">YOU HAVE A DUPLICATE SOURCE ENTRY - PLEASE RETRY</h3>';
            // }
		} 

		$lnbDniSettings = get_option('lnb-dni-settings');
       
        ?>
        
		<div class="lnbSettingsPage">
			<br /><h1 class="lnbSettingsPage__title">LeadsNearby - DNI Settings</h1>
			<p>Enter the tracking number and select the visitor source that should cause it to be displayed.  The phone number will be displayed on the site the way it is formatted here</p>
            <i><b></b></i><br />
			<form id="dni-form" method="post" class="lnbSettings" method="post" action="">
			<div class="rowLnbSettingContainer">
            <div class="lnbSettingHeaderRow rowLnbSetting" data-index="0">
                <div></div>
                <div><h3>Tracking Number</h3></div>
                <div><h3>Source</h3></div>
                <div><h3>Custom Source Input </h3></div>
            </div>
			<?php if(is_array($lnbDniSettings)) { foreach ($lnbDniSettings as $i => $setting) { ?>
			<div class="rowLnbSetting sr<?php echo $i ?>" data-index="<?php echo $i ?>">
                <div style="cursor: pointer;" class="dni-delete"><img style="width: 70%;" src="<?php echo plugin_dir_url(__FILE__) . 'assets/img/Close_Icon_Circle-512.png'; ?>"></div>
				<div class="lnbSetting setting-left" >
					<input required="" class="lnbSetting__field lnbSetting__field--text" name="option[<?php echo $i ?>][phone-number]" type="tel" maxlength="14" value="<?php echo $setting['phone-number'] ?>">
					<label class="lnbSetting__label">Tracking Number</label>
					<span class="lnbSetting__highlight"></span>
				</div>
				<div class="lnbSetting setting-right">
					<select form="dni-form" class="lnbSetting__select lnbSetting__select--text" name="option[<?php echo $i ?>][source-select]" value="">
						<option value="www.google.com" <?php if ($setting['source-select'] == "www.google.com") echo 'selected'; ?>><i class="fab fa-google"></i>Google Organic</option>
						<option value="www.bing.com" <?php if ($setting['source-select'] == "www.bing.com") echo 'selected'; ?>>Bing Organic</option>
						<option value="direct" <?php if ($setting['source-select'] == "direct") echo 'selected'; ?>><i class="fas fa-keyboard"></i>Direct/Other</option>
						<option value="ppc" <?php if ($setting['source-select'] == "ppc") echo 'selected'; ?>><i class="fab fa-google"></i>Google Adwords</option>
						<option value="ma" <?php if ($setting['source-select'] == "ma") echo 'selected'; ?>><i class="fas fa-envelope"></i>Marketing Automation</option>
						<option value="www.facebook.com"<?php if ($setting['source-select'] == "www.facebook.com") echo 'selected'; ?>><i class="fab fa-facebook"></i>Facebook</option>
						<option value="www.yelp.com"<?php if ($setting['source-select'] == "www.yelp.com") echo 'selected'; ?>><i class="fab fa-yelp"></i>Yelp</option>
                        <option class="dni-custom-select" value="custom"<?php if ($setting['source-select'] == "custom") echo 'selected'; ?>>Custom</option>
                    </select>
                </div>
                 
                 <?php if(isset($setting['custom-referrer'])) { ?>
                 <div class="lnbSetting setting-custom-row" >
					<input required="" class="lnbSetting__field lnbSetting__field--text" name="option[<?php echo $i ?>][custom-referrer]" type="tel" maxlength="30" value="<?php echo $setting['custom-referrer'] ?>">
					<label class="lnbSetting__label">Custom Referrer</label>
					<span class="lnbSetting__highlight"></span>
				</div>
                <?php } ?>
			</div>
			<?php } ?>
            <?php } ?>
			</div>
			</form>
           
         <div style="margin-top: 20px" class="form-buttons">
            <input form="dni-form" id="save-settings" class="button button-primary" type="submit" name="submit" value="Save Options">
            <button class="add-row button button-primary">Add New Number</button>
        </div>
         </div>
    <?php } 
    
	private function dni_get_url_params() {
		if (isset($_GET)) {
			return $_GET;
		}
	}
	
	private function dni_get_data() {
		return get_option('lnb-dni-settings');
	}
	
}

$plugin = new LnbDni();