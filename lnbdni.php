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

class LnbStDni { 
	
	public function __construct() {
		add_action( 'admin_menu', array( $this, 'add_menu_entry' ) );
		add_action( 'admin_enqueue_scripts', array($this, 'register_backend_scripts' ));
		add_action( 'wp_enqueue_scripts', array($this, 'register_frontend_scripts' ));
	}
	
	public function add_menu_entry() {
		if (current_user_can('administrator')) {
			add_options_page('LeadsNearby / Service Titan DNI Settings', 'LNB-ST-DNI', 'administrator', 'lnb-st-dni', array($this, 'menu_page'));
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
            $dup = false;
            
            foreach ($_POST['option'] as $post_settings) {
                if(in_array($post_settings['source-select'], $temp_setting_keys)) {
                    $dup = true;
                }
                $temp_setting_keys[] = $post_settings['source-select'];
            }
            
            if ($dup === false) {
                update_option('lnb-dni-settings', $_POST['option']);
            } else {
                echo '<h3 style="color: red">YOU HAVE A DUPLICATE SOURCE ENTRY - PLEASE RETRY</h3>';
            }
		}

		$lnbDniSettings = get_option('lnb-dni-settings');
		
		?>

		<div class="lnbSettingsPage">
			<br /><h1 class="lnbSettingsPage__title">LeadsNearby / Service Titan - DNI Settings</h1>
			<p>Enter the tracking number and select the visitor source that should cause it to be displayed.  The phone number will be displayed on the site the way it is formatted here</p>
            <i><b></b></i><br /><br />
			<form id="dni-form" method="post" class="lnbSettings" method="post" action="">
			<div class="rowLnbSettingContainer">
			<?php foreach ($lnbDniSettings as $i => $setting) { ?>
			<div class="rowLnbSetting sr<?php echo $i ?>" data-index="<?php echo $i ?>">
				<div class="lnbSetting setting-left" >
					<input required="" class="lnbSetting__field lnbSetting__field--text" name="option[<?php echo $i ?>][phone-number]" type="tel" maxlength="14" value="<?php echo $setting['phone-number'] ?>">
					<label class="lnbSetting__label">Tracking Number</label>
					<span class="lnbSetting__highlight"></span>
				</div>
				<div class="lnbSetting setting-right">
					<select form="dni-form" class="lnbSetting__select lnbSetting__select--text" name="option[<?php echo $i ?>][source-select]" value="">
						<option value="google.com" <?php if ($setting['source-select'] == "google.com") echo 'selected'; ?>>Google Organic</option>
						<option value="bing.com" <?php if ($setting['source-select'] == "bing.com") echo 'selected'; ?>>Bing Organic</option>
						<option value="direct" <?php if ($setting['source-select'] == "direct") echo 'selected'; ?>>Direct/Other</option>
						<option value="ppc" <?php if ($setting['source-select'] == "ppc") echo 'selected'; ?>>PPC</option>
						<option value="ma" <?php if ($setting['source-select'] == "ma") echo 'selected'; ?>>Marketing Automation</option>
						<option value="facebook.com"<?php if ($setting['source-select'] == "facebook.com") echo 'selected'; ?>>Facebook</option>
						<option value="yelp.com"<?php if ($setting['source-select'] == "yelp.com") echo 'selected'; ?>>Yelp</option>
					<select>
				</div>
				<div style="cursor: pointer;" class="dni-delete"><img style="width: 70%;" src="<?php echo plugin_dir_url(__FILE__) . 'assets/img/Close_Icon_Circle-512.png'; ?>"></div>
			</div>
			<?php } ?>
			</div>
			
			<input id="save-settings" class="button button-primary" type="submit" name="submit" value="Save Options">
			</form>
			<button style="margin-top: 15px;" class="add-row button button-primary">Add New Row</button>
		</div>
		
		<?php
	
	}
	
	private function dni_get_url_params() {
		if (isset($_GET)) {
			return $_GET;
		}
	}
	
	private function dni_get_data() {
		return get_option('lnb-dni-settings');
	}
	
}

$plugin = new LnbStDni();
