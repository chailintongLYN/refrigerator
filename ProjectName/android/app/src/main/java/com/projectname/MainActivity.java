package com.projectname;

//开头
import com.imagepicker.permissions.OnImagePickerPermissionsCallback; // <- add this import
import com.facebook.react.modules.core.PermissionListener; // <- add this import
import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
// import android.os.Bundle;
// import cn.jpush.android.api.JPushInterface;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;


public class MainActivity extends ReactActivity {

  private PermissionListener listener;
  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "ProjectName";
  }
  // @Override
  // protected ReactActivityDelegate createReactActivityDelegate() {
  //   return new ReactActivityDelegate(this, getMainComponentName()) {
  //       @Override
  //       protected ReactRootView createRootView() {
  //       return new RNGestureHandlerEnabledRootView(MainActivity.this);
  //       }
  //   };
  // }
    // @Override
    // protected void onCreate(Bundle savedInstanceState) {
    //     super.onCreate(savedInstanceState);
    //     JPushInterface.init(this);
    // }

    // @Override
    // protected void onPause() {
    //     super.onPause();
    //     JPushInterface.onPause(this);
    // }

    // @Override
    // protected void onResume() {
    //     super.onResume();
    //     JPushInterface.onResume(this);
    // }

    // @Override
    // protected void onDestroy() {
    //     super.onDestroy();
    // }
}
