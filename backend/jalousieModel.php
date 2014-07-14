<?php

require_once 'Model.php';

/**
 * Model class for feed objects
 */
class jalousieModel extends Model {

  const MODEL_KIND = 'jalousieCommands';

  private $currentState;
  private $user;
  private $time;

  public function __construct($initialState, $user) {
    parent::__construct();
    // $this->key_name = "timestamp";
    $this->key_id = time();
    $this->time = date("Y-m-d H:i:s");
    $this->currentState = $initialState;
    $this->user = $user;
  }

  public function setTime($time){
    $this->time=$time;
  }

  public function getCurrentState() {
    return $this->currentState;
  }


  protected static function getKindName() {
    return self::MODEL_KIND;
  }

  /**
   * Generate the entity property map from the feed object fields.
   */
  protected function getKindProperties() {
    $property_map = [];

    $property_map["currentState"] =
        parent::createStringProperty($this->currentState, true);
    $property_map["user"] =
        parent::createStringProperty($this->user, true);
    $property_map["time"] =
        parent::createDateProperty($this->time, true);
    return $property_map;
  }


  /**
   * Fetch a feed object given its feed URL.  If get a cache miss, fetch from the Datastore.
   * @param $feed_url URL of the feed.
   */
  public static function get($state) {
    $query = parent::createQuery(self::MODEL_KIND);
    $state_filter = parent::createStringFilter("currentState", $state);
    $filter = parent::createCompositeFilter([$state_filter]);
    $query->setFilter($filter);

    $results = parent::executeQuery($query);
    $extracted = self::extractQueryResults($results);
    return $extracted;
  }

  public static function getLast($count, $json=false) {
    $query = parent::createQuery(self::MODEL_KIND);
    //$state_filter = parent::createStringFilter("currentState", $state);
    //$filter = parent::createCompositeFilter([$state_filter]);
    //$query->setFilter($filter);

    $query->setLimit($count);

    parent::addOrder($query,"time","descending");

    $results = parent::executeQuery($query);
    if($json) 
      $extracted = self::extractQueryResultsJSON($results);
    else 
      $extracted = self::extractQueryResults($results);
    return $extracted;
  }

  /**
   * This method will be called after a Datastore put.
   */
  // protected function onItemWrite() {
  //   $mc = new Memcache();
  //   try {
  //     $key = self::getCacheKey($this->currentState);
  //     $mc->add($key, $this, 0, 120);
  //   }
  //   catch (Google_Cache_Exception $ex) {
  //     syslog(LOG_WARNING, "in onItemWrite: memcache exception");
  //   }
  // }

  /**
  * This method will be called prior to a datastore delete
  */
  // protected function beforeItemDelete() {
  //   $mc = new Memcache();
  //   $key = self::getCacheKey($this->currentState);
  //   $mc->delete($key);
  // }

  /**
   * Extract the results of a Datastore query into FeedModel objects
   * @param $results Datastore query results
   */
  protected static function extractQueryResults($results) {
    $query_results = [];
    foreach($results as $result) {
      $id = @$result['entity']['key']['path'][0]['id'];
      $key_name = @$result['entity']['key']['path'][0]['name'];
      $props = $result['entity']['properties'];
      $currentState = $props["currentState"]->getStringValue();
      $user = $props["user"]->getStringValue();
      $time = $props["time"]->getDateTimeValue();

      $the_model = new jalousieModel($currentState,$user);
      $the_model->setTime($time);
      $the_model->setKeyId($id);
      $the_model->setKeyName($key_name);
      // Cache this read feed.
      $the_model->onItemWrite();

      $query_results[] = $the_model;
    }
    return $query_results;
  }

  protected static function extractQueryResultsJSON($results) {
    $query_results = [];
    foreach($results as $result) {
      $id = @$result['entity']['key']['path'][0]['id'];
      $key_name = @$result['entity']['key']['path'][0]['name'];
      $props = $result['entity']['properties'];
      $currentState = $props["currentState"]->getStringValue();
      $user = $props["user"]->getStringValue();
      $time = $props["time"]->getDateTimeValue();

      $the_model = ["currentState"=>$currentState,"user"=>$user,"time"=>$time,"id"=>$id];

      $query_results[] = $the_model;
    }
    return json_encode($query_results);
  }

  // private static function getCacheKey($feed_url) {
  //   return sprintf("%s_%s", self::MODEL_KIND, sha1($feed_url));
  // }
}
